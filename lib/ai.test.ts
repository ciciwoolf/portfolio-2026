import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAIResponse } from './ai';
import type { ChatMessage } from './ai';

// Mock the OpenAI module
vi.mock('openai', () => {
  const mockCreate = vi.fn();

  return {
    default: class MockOpenAI {
      chat = {
        completions: {
          create: mockCreate,
        },
      };
    },
  };
});

// Get access to the mocked create function
let mockCreate: ReturnType<typeof vi.fn>;

describe('AI Utility', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const OpenAI = await import('openai');
    const instance = new OpenAI.default({ apiKey: 'test-key' });
    mockCreate = instance.chat.completions.create as ReturnType<typeof vi.fn>;
  });

  describe('getAIResponse', () => {
    it('should return AI response for valid messages', async () => {
      // Arrange: Set up mock OpenAI response
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Christine is a Senior Software Engineer at Capillary Technologies.',
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act: Call the function
      const messages: ChatMessage[] = [
        { role: 'user', content: 'What is Christine\'s current role?' },
      ];

      const response = await getAIResponse(messages);

      // Assert: Verify the response
      expect(response).toBe('Christine is a Senior Software Engineer at Capillary Technologies.');
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'openai/gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 500,
        })
      );
    });

    it('should include system prompt with background context', async () => {
      // Arrange
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Test response',
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      const messages: ChatMessage[] = [
        { role: 'user', content: 'Tell me about Christine' },
      ];

      await getAIResponse(messages);

      // Assert: Verify system prompt includes key background elements
      const callArgs = mockCreate.mock.calls[0]?.[0];
      const systemMessage = callArgs?.messages?.[0];

      expect(systemMessage?.role).toBe('system');
      expect(systemMessage?.content).toContain('Senior Software Engineer');
      expect(systemMessage?.content).toContain('Christine Woolf');
      expect(systemMessage?.content).toContain('Capillary Technologies');
    });

    it('should throw error when OpenAI returns no response', async () => {
      // Arrange: Mock empty response
      const mockResponse = {
        choices: [],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act & Assert
      const messages: ChatMessage[] = [
        { role: 'user', content: 'Hello' },
      ];

      await expect(getAIResponse(messages)).rejects.toThrow(
        'Unable to generate response. Please try again later.'
      );
    });

    it('should throw user-friendly error on API key error', async () => {
      // Arrange: Mock API key error
      mockCreate.mockRejectedValue(new Error('Invalid API key provided'));

      // Act & Assert
      const messages: ChatMessage[] = [
        { role: 'user', content: 'Hello' },
      ];

      await expect(getAIResponse(messages)).rejects.toThrow(
        'AI service configuration error. Please contact the site owner.'
      );
    });

    it('should throw generic error for other API errors', async () => {
      // Arrange: Mock network error
      mockCreate.mockRejectedValue(new Error('Network error'));

      // Act & Assert
      const messages: ChatMessage[] = [
        { role: 'user', content: 'Hello' },
      ];

      await expect(getAIResponse(messages)).rejects.toThrow(
        'Unable to generate response. Please try again later.'
      );
    });
  });
});
