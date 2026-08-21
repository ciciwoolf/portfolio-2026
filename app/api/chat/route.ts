import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse } from '@/lib/ai';
import type { ChatMessage } from '@/lib/ai';

/**
 * POST /api/chat
 *
 * Chat endpoint that processes user messages and returns AI responses
 *
 * Request body: { messages: ChatMessage[] }
 * Response: { response: string } or { error: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request body
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    // Validate messages format
    const messages: ChatMessage[] = body.messages;

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array cannot be empty' },
        { status: 400 }
      );
    }

    // Validate each message has required fields
    for (const message of messages) {
      if (!message.role || !message.content) {
        return NextResponse.json(
          { error: 'Invalid request: each message must have role and content' },
          { status: 400 }
        );
      }

      if (!['user', 'assistant', 'system'].includes(message.role)) {
        return NextResponse.json(
          { error: 'Invalid request: role must be user, assistant, or system' },
          { status: 400 }
        );
      }
    }

    // Get AI response
    const response = await getAIResponse(messages);

    // Return successful response
    return NextResponse.json(
      { response },
      { status: 200 }
    );

  } catch (error) {
    console.error('Chat API error:', error);

    // Return user-friendly error
    const errorMessage = error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
