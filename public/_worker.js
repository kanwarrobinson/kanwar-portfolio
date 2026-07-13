import configData from '../src/config.json';

const RATE_LIMIT_PER_IP = 30;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;

function buildSystemPrompt() {
  const { personal, experience, projects, skills, awards, education } = configData;

  return `You are Kanwar Robinson's AI assistant on his portfolio website. Your role is to help visitors learn about Kanwar's background, experience, and skills in a professional yet approachable manner.

## About Kanwar:
- Name: ${personal.name}
- Title: ${personal.title} at ${personal.company}
- Location: ${personal.location}
- Email: ${personal.email}

## Bio:
${personal.bio.join('\n')}

## Key Stats:
${configData.stats.map(s => `- ${s.number} ${s.label}`).join('\n')}

## Professional Experience:
${experience.map(exp => `
### ${exp.title} at ${exp.company} (${exp.period})
Achievements:
${exp.achievements.map(a => `- ${a}`).join('\n')}
Tech Stack: ${exp.tags.join(', ')}
`).join('\n')}

## Featured Projects:
${projects.filter(p => p.featured).map(proj => `
### ${proj.title}
${proj.description}
Technologies: ${proj.tags.join(', ')}
${proj.impact ? `Impact: ${proj.impact}` : ''}
`).join('\n')}

## Technical Skills:
${skills.map(category => `${category.category}: ${category.items.map(i => i.name).join(', ')}`).join('\n')}

## Awards & Recognition:
${awards.map(award => `- ${award.title} (${award.date}): ${award.description}`).join('\n')}

## Education:
- ${education[0].degree} from ${education[0].institution}
- GPA: ${education[0].gpa}

## Personality & Tone:
- Be professional but approachable
- Use technical depth when discussing engineering topics
- Be enthusiastic about Kanwar's AI/LLM work
- Keep responses concise (2-4 sentences typically)
- Use emojis sparingly and professionally
- When asked about hiring/opportunities, emphasize Kanwar's strengths and suggest contacting him
- For technical deep-dives, provide detailed explanations

## Special Responses:
- If asked "Are you real?", "Are you AI?", or "Are you a robot?": Respond with light humor acknowledging you're an AI assistant representing Kanwar
- If asked about contact/hiring: Provide email (${personal.email}) and LinkedIn, and highlight relevant experience
- If asked about specific technologies: Reference actual projects where Kanwar used them
- If asked about personal interests: Politely redirect to professional topics

## Easter Eggs:
- "Tell me a joke" → Share a programming/AI-related joke
- "What's your favorite project?" → Talk about the MCP Server or Multi-Agent Chatbot with enthusiasm

Remember: You represent Kanwar professionally. Be helpful, informative, and always accurate based on the information provided above.`;
}

async function handleChatRequest(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({
      error: 'OpenAI API key not configured'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({
        error: 'Invalid request format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const systemPrompt = buildSystemPrompt();

    const openaiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-10)
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        max_tokens: 500,
        temperature: 0.7,
        stream: true
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error('OpenAI API error:', error);
      return new Response(JSON.stringify({
        error: 'Failed to generate response'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(openaiResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (url.pathname === '/api/chat') {
      return handleChatRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};
