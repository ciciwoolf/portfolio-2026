'use client';

import dynamic from 'next/dynamic';

/**
 * Client Component wrapper for ChatWidget
 *
 * This wrapper is needed because `ssr: false` in next/dynamic
 * can only be used in Client Components in Next.js 15+
 */
const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
});

export default function ChatWidgetWrapper() {
  return <ChatWidget />;
}
