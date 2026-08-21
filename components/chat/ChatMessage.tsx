import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * ChatMessage component displays individual messages in the chat
 *
 * - User messages: right-aligned with primary color background
 * - Assistant messages: left-aligned with secondary color background
 * - Assistant messages support markdown formatting
 */
export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        }`}
      >
        {isUser ? (
          // User messages: plain text
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        ) : (
          // Assistant messages: markdown rendering
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
