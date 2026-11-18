// Client for the rag-chatbot backend (FastAPI on Render).
// Ported from the original frontend, with two changes: TypeScript types, and the
// base URL comes from PUBLIC_CHATBOT_API_URL (see .env.example).

const API_BASE = ((import.meta.env.PUBLIC_CHATBOT_API_URL as string | undefined) ?? '').replace(
  /\/$/,
  '',
);

/** False when PUBLIC_CHATBOT_API_URL isn't set (e.g. no .env yet). */
export const chatConfigured = API_BASE !== '';

export class ChatError extends Error {}

/** One Server-Sent Event from /api/chat/stream: text pieces, then `done` or `error`. */
interface StreamEvent {
  text?: string;
  error?: string;
  done?: boolean;
}

async function readErrorMessage(response: Response): Promise<string> {
  const fallback = 'Something went wrong. Please try again.';
  try {
    const body = await response.json();
    // The backend sends friendly text as a string; validation errors are lists.
    if (typeof body.detail === 'string') return body.detail;
    if (response.status === 422) return 'Please keep your question between 1 and 500 characters.';
  } catch {
    // Not JSON: use the fallback below.
  }
  return fallback;
}

/** True if the backend answers. A sleeping server just times out. */
export async function checkHealth(): Promise<boolean> {
  if (!API_BASE) return false;
  try {
    const response = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(5000) });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Ask a question and receive the answer piece by piece.
 * `onText` is called with each new piece of text as it arrives.
 */
export async function streamAnswer(question: string, onText: (piece: string) => void) {
  if (!API_BASE) {
    throw new ChatError("The chatbot isn't connected yet. Please email Chris instead.");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
  } catch {
    throw new ChatError(
      "Can't reach the server. It may be waking up (this can take up to a minute). Please try again shortly.",
    );
  }

  if (!response.ok || !response.body) {
    throw new ChatError(await readErrorMessage(response));
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    // Events are separated by a blank line. The last piece may be incomplete,
    // so keep it in the buffer until more data arrives.
    const events = buffer.split('\n\n');
    buffer = events.pop() ?? '';

    for (const rawEvent of events) {
      const line = rawEvent.trim();
      if (!line.startsWith('data:')) continue;

      let payload: StreamEvent;
      try {
        payload = JSON.parse(line.slice(5).trim());
      } catch {
        continue; // ignore a malformed event rather than breaking the whole answer
      }
      if (payload.error) throw new ChatError(payload.error);
      if (payload.text) onText(payload.text);
      if (payload.done) return;
    }
  }
}
