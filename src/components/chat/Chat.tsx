import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import MessageBubble, { type Message } from './MessageBubble';
import { ChatError, streamAnswer } from './chatApi';
import { useServerStatus, type ServerStatus } from './useServerStatus';

const GREETING: Message = {
  id: 'greeting',
  role: 'assistant',
  text: "Hi! Ask me anything about Chris's experience, skills or projects.",
};

const SUGGESTED_QUESTIONS = [
  'What did Chris build at Frizzell?',
  'How much experience does he have?',
  'What roles is he looking for?',
  "What's his phone number?", // deliberately shows the bot declining to invent info
];

const GENERIC_ERROR = 'Something went wrong. Please try again.';

const STATUS_LABEL: Record<ServerStatus, string> = {
  checking: 'Connecting…',
  waking: 'Waking up…',
  ready: 'Online',
  unavailable: 'Offline',
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  // idle: ready | waiting: question sent, no text yet | streaming: answer arriving
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'streaming'>('idle');
  const { status: serverStatus, retry } = useServerStatus();
  const listRef = useRef<HTMLDivElement>(null);

  // Don't allow sending while the server is still waking up, or while an answer is on its way.
  const serverPending = serverStatus === 'checking' || serverStatus === 'waking';
  const blocked = phase !== 'idle' || serverPending;

  // Keep the newest text in view. Scroll the message box itself, not the whole page.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, phase]);

  const handleSend = async (question: string) => {
    const answerId = crypto.randomUUID();
    let answerStarted = false;

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text: question }]);
    setPhase('waiting');

    try {
      await streamAnswer(question, (piece) => {
        if (!answerStarted) {
          // First piece: create the answer bubble (this removes the typing dots).
          answerStarted = true;
          setPhase('streaming');
          setMessages((prev) => [...prev, { id: answerId, role: 'assistant', text: piece }]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === answerId ? { ...m, text: m.text + piece } : m)),
          );
        }
      });
    } catch (error) {
      const text = error instanceof ChatError ? error.message : GENERIC_ERROR;
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', text, isError: true },
      ]);
    } finally {
      setPhase('idle');
    }
  };

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-widget">
      <div className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-4">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-ink font-heading text-sm font-bold text-white"
          >
            CH
          </span>
          <span className="font-semibold">Ask Chris's CV</span>
        </div>
        <span className="flex items-center gap-2 text-[13px] text-muted">
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${serverStatus === 'ready' ? 'bg-success' : 'bg-muted'}`}
          />
          {STATUS_LABEL[serverStatus]}
        </span>
      </div>

      {serverStatus === 'waking' && (
        <p role="status" className="m-0 border-b border-line bg-band px-[22px] py-3 text-sm text-body">
          <strong className="font-semibold text-ink">Waking up the server…</strong> The free hosting
          plan sleeps when idle, so the first load can take up to a minute. You can ask a question
          as soon as it's ready.
        </p>
      )}
      {serverStatus === 'unavailable' && (
        <div
          role="alert"
          className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-band px-[22px] py-3 text-sm text-body"
        >
          <span>The server isn't responding right now. You can still try a question.</span>
          <button
            type="button"
            onClick={retry}
            className="min-h-11 cursor-pointer font-semibold text-accent underline hover:text-accent-dark"
          >
            Retry
          </button>
        </div>
      )}

      {/* aria-live: screen readers announce new messages; aria-busy waits until the answer is complete. */}
      <div
        ref={listRef}
        aria-live="polite"
        aria-busy={phase !== 'idle'}
        className="flex max-h-[420px] min-h-[260px] flex-col gap-3.5 overflow-y-auto bg-[#fcfcfd] px-[22px] py-6"
      >
        {messages.map(({ id, ...message }) => (
          <MessageBubble key={id} {...message} />
        ))}
        {phase === 'waiting' && (
          <div className="flex justify-start" role="status" aria-label="Chris's CV is typing">
            <div className="flex items-center gap-1 rounded-[14px] rounded-bl-[4px] bg-band px-4 py-3.5">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  aria-hidden="true"
                  className="size-2 rounded-full bg-muted motion-safe:animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5 px-[22px] pb-4">
        <div className="text-[13px] text-muted">Try a question:</div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              disabled={blocked}
              onClick={() => handleSend(question)}
              className="min-h-11 cursor-pointer rounded-full border border-line-strong bg-white px-3.5 py-2 text-sm text-body hover:border-accent hover:text-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <ChatInput onSend={handleSend} disabled={blocked} />

      <div className="px-[22px] pb-4 text-[13px] text-muted">
        <a
          href="https://rag-chatbot-psi-liart.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2"
        >
          Open the full chatbot ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
