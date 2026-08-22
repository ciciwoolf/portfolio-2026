'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import siteConfig from '@/content/site-config.json';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

/**
 * ChatInput component provides a text input field for sending messages
 *
 * Features:
 * - Auto-resizing textarea based on content
 * - Enter key to send (Shift+Enter for newline)
 * - Disabled state while message is being sent
 * - Clears input after sending
 * - Accessible with proper ARIA labels
 */
export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage(''); // Clear input after sending

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter without Shift = send message
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSend();
    }
    // Shift+Enter = allow newline (default behavior)
  };

  return (
    <div className="border-t border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex gap-2 items-center">
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? siteConfig.chat.inputPlaceholderDisabled : siteConfig.chat.inputPlaceholder}
          rows={1}
          className="flex-1 px-4 py-2.5 bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[var(--foreground-muted)] overflow-hidden"
          style={{ minHeight: '44px', maxHeight: '200px' }}
          aria-label="Chat message input"
        />

        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="px-6 py-2.5 bg-[var(--accent-button)] text-white rounded-lg font-medium hover:bg-[var(--accent-button-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          style={{ height: '44px' }}
          aria-label="Send message"
        >
          {siteConfig.chat.sendButtonText}
        </button>
      </div>

      <p className="text-xs text-[var(--foreground-muted)] mt-2">
        {siteConfig.chat.keyboardHint}
      </p>
    </div>
  );
}
