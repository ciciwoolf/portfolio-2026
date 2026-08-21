import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import backgroundData from '@/content/background.json';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
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
      throw new Error('No response from OpenAI');
    }

    return response;
  } catch (error) {
    console.error('OpenAI API error:', error);

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
1. Answer questions about Christine's background, skills, experience, projects, AND personal interests/hobbies
2. Use the personality and communication style described above
3. Be friendly, professional, and enthusiastic
4. If asked about working with her, mention her deep focus work style and research-first approach
5. If asked about hobbies or life outside work, share about Muay Thai, painting, cats, chocolate desserts, and international adventures
6. If you don't know something specific, say so honestly
7. Keep responses concise (2-3 paragraphs max)
8. Reference specific experiences when relevant

You have access to her full background, including:
- Complete work history at Capillary Technologies, TSI, Science Museum of Minnesota, and Best Buy
- Technical specialties in authentication/authorization, AI-assisted development, IoT systems, and performance monitoring
- Projects including this portfolio, 3D interactive portfolio, and AI chatbot
- Education background in Philosophy, German, Spanish, and Web Development

When someone asks about Christine, respond as if you're a knowledgeable assistant who knows her well, but speak in third person ("Christine is...", "She has experience with...", etc.).`;
}

// Export types for use in other files
export type { ChatCompletionMessageParam as ChatMessage };
