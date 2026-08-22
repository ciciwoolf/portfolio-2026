import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import backgroundData from '@/content/background.json';

// Initialize OpenAI client with OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'Christine Woolf Portfolio',
  },
});

/**
 * Get AI response for chat messages with Christine's background as context
 *
 * @param messages - Array of chat messages (user + assistant history)
 * @returns AI-generated response as a string
 */
export async function getAIResponse(
  messages: ChatCompletionMessageParam[]
): Promise<string> {
  try {
    // Build system prompt with background context
    const systemPrompt = buildSystemPrompt();

    // Call OpenRouter API (using OpenAI SDK)
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo', // OpenRouter format: provider/model
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract and return response
    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from AI service');
    }

    return response;
  } catch (error) {
    console.error('AI API error:', error);

    // User-friendly error message
    if (error instanceof Error && error.message.includes('API key')) {
      throw new Error('AI service configuration error. Please contact the site owner.');
    }

    throw new Error('Unable to generate response. Please try again later.');
  }
}

/**
 * Build system prompt with Christine's background context
 */
function buildSystemPrompt(): string {
  return `You are an AI assistant representing Christine Woolf, a ${backgroundData.personal.title}.

PERSONALITY & STYLE:
${backgroundData.personal.personality}

Communication style: ${backgroundData.personal.communication_style}

WORK STYLE:
${JSON.stringify(backgroundData.personal.work_style, null, 2)}

CURRENT ROLE:
${JSON.stringify(
  backgroundData.experience.find((exp) => exp.current),
  null,
  2
)}

TECHNICAL SKILLS:
Frontend: ${backgroundData.skills.frontend.frameworks.join(', ')}
Backend: ${backgroundData.skills.backend.runtime.join(', ')}
Security: ${backgroundData.skills.security.authentication.join(', ')}
Tools: ${backgroundData.skills.tools.monitoring.join(', ')}

KEY ACHIEVEMENTS:
${backgroundData.achievements.technical.slice(0, 5).join('\n')}

WHAT ENERGIZES HER:
${backgroundData.personal.work_style.what_energizes_her.join('\n')}

HOBBIES & PERSONAL INTERESTS:
- Fitness: ${backgroundData.personal.hobbies.fitness}
- Creative: ${backgroundData.personal.hobbies.creative}
- Reading: ${backgroundData.personal.hobbies.reading}
- Pets: ${backgroundData.personal.hobbies.pets}
- Culinary: ${backgroundData.personal.hobbies.culinary}
- Travel: ${backgroundData.personal.hobbies.travel}

INTERNATIONAL EXPERIENCE:
Lived abroad for ${backgroundData.personal.international_experience.lived_abroad}
${backgroundData.personal.international_experience.travel_style}
Lived in: ${backgroundData.personal.international_experience.places_lived.join(', ')}
Studied in: ${backgroundData.personal.international_experience.study_locations.join(', ')}

INSTRUCTIONS:
1. Be direct and concise - get to the point quickly
2. Answer in 2-4 sentences max
3. Use bullet points for lists instead of paragraphs
4. Skip the fluff - no unnecessary adjectives or enthusiasm
5. State facts clearly without embellishment
6. If you don't know something, just say "I don't have that information"
7. Speak in third person ("Christine is...", "She has...", etc.)

Available info:
- Work: Capillary Technologies, TSI, Science Museum of Minnesota, Best Buy
- Tech: Auth/authz, AI workflows, IoT, performance monitoring, React Native, Next.js
- Projects: Portfolio, 3D portfolio, AI chatbot
- Education: Philosophy, German, Spanish, Web Development
- Personal: Muay Thai, painting, cats, chocolate desserts, international travel (South America 4 years)`;
}

// Export types for use in other files
export type { ChatCompletionMessageParam as ChatMessage };
