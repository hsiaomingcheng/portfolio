import { useCallback, useEffect, useState } from 'react';
import { chatConfigured, checkHealth } from './chatApi';

const RETRY_DELAY_MS = 3000;
const MAX_ATTEMPTS = 30; // about 90 seconds, longer than a typical cold start
const SHOW_WAKING_AFTER_MS = 1500; // a fast server never flashes "Waking up…"

export type ServerStatus = 'checking' | 'waking' | 'ready' | 'unavailable';

/**
 * Checks the backend when the widget appears and keeps retrying while it wakes up.
 * `retry` starts the whole check again (used by the "Retry" button).
 */
export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>('checking');
  const [round, setRound] = useState(0);

  useEffect(() => {
    // No API address set: nothing to wake up, so don't spend 90 seconds retrying.
    if (!chatConfigured) {
      setStatus('unavailable');
      return;
    }

    let cancelled = false;

    const wakingTimer = setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === 'checking' ? 'waking' : s));
    }, SHOW_WAKING_AFTER_MS);

    async function waitForServer() {
      for (let attempt = 0; attempt < MAX_ATTEMPTS && !cancelled; attempt++) {
        if (await checkHealth()) {
          if (!cancelled) setStatus('ready');
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
      if (!cancelled) setStatus('unavailable');
    }
    waitForServer();

    return () => {
      cancelled = true;
      clearTimeout(wakingTimer);
    };
  }, [round]);

  const retry = useCallback(() => {
    setStatus('checking');
    setRound((n) => n + 1);
  }, []);

  return { status, retry };
}
