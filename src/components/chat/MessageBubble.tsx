import type { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import { site } from '../../data/site';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isError?: boolean;
}

// Tailwind removes default list/paragraph styling, so give the Markdown elements their look here.
// `node` is passed in by react-markdown; we drop it so it doesn't end up on the DOM element.
const markdownComponents = {
  p: ({ node: _node, ...props }: ComponentProps<'p'> & { node?: unknown }) => (
    <p className="my-2 first:mt-0 last:mb-0" {...props} />
  ),
  ul: ({ node: _node, ...props }: ComponentProps<'ul'> & { node?: unknown }) => (
    <ul className="my-2 list-disc space-y-1 pl-5 first:mt-0 last:mb-0" {...props} />
  ),
  ol: ({ node: _node, ...props }: ComponentProps<'ol'> & { node?: unknown }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5 first:mt-0 last:mb-0" {...props} />
  ),
  strong: ({ node: _node, ...props }: ComponentProps<'strong'> & { node?: unknown }) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ node: _node, ...props }: ComponentProps<'a'> & { node?: unknown }) => (
    <a target="_blank" rel="noopener noreferrer" {...props} />
  ),
  code: ({ node: _node, ...props }: ComponentProps<'code'> & { node?: unknown }) => (
    <code className="rounded bg-line px-1 py-0.5 text-[0.85em]" {...props} />
  ),
};

export default function MessageBubble({ role, text, isError }: Omit<Message, 'id'>) {
  const isUser = role === 'user';

  // Visitor = accent background; bot = band background; errors get a border so they stand out.
  let style = 'rounded-bl-[4px] bg-band text-ink';
  if (isUser) style = 'rounded-br-[4px] bg-accent text-white';
  if (isError) style = 'rounded-bl-[4px] border border-line-strong bg-white text-ink';

  // Only the bot's answers are Markdown. What the visitor types stays plain text.
  const renderAsMarkdown = !isUser && !isError;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-[14px] px-4 py-3 text-base ${
          renderAsMarkdown ? '' : 'whitespace-pre-wrap'
        } ${style}`}
      >
        {renderAsMarkdown ? <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown> : text}
        {isError && (
          <p className="mb-0 mt-2">
            <a href={`mailto:${site.email}`} className="font-semibold">
              Email Chris instead
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
