import { useId, useState, type Ref, type SyntheticEvent } from 'react';

const MAX_LENGTH = 500; // keep in sync with MAX_QUESTION_CHARS in the backend's config.py

interface Props {
  onSend: (question: string) => void;
  disabled: boolean;
  /** Lets the parent return focus to the input after an answer finishes. */
  inputRef?: Ref<HTMLInputElement>;
}

export default function ChatInput({ onSend, disabled, inputRef }: Props) {
  const [value, setValue] = useState('');
  const inputId = useId();
  const hintId = useId();
  const atLimit = value.length >= MAX_LENGTH;

  const submit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault(); // pressing Enter in the input submits the form
    const question = value.trim();
    if (!question || disabled) return;
    onSend(question);
    setValue('');
  };

  return (
    <form onSubmit={submit} className="border-t border-line px-[22px] py-4">
      <div className="flex gap-2.5">
        <label htmlFor={inputId} className="sr-only">
          Your question
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          maxLength={MAX_LENGTH}
          disabled={disabled}
          placeholder="Type your question…"
          aria-describedby={atLimit ? hintId : undefined}
          className="h-[46px] min-w-0 flex-auto rounded-lg border border-line-strong bg-white px-3.5 text-base text-ink placeholder:text-muted disabled:bg-surface"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="h-[46px] cursor-pointer rounded-lg bg-ink px-5 font-semibold text-white hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
        >
          Send
        </button>
      </div>
      {atLimit && (
        <p id={hintId} role="status" className="m-0 mt-2 text-[13px] text-muted">
          You've reached the {MAX_LENGTH}-character limit. Please shorten your question.
        </p>
      )}
    </form>
  );
}
