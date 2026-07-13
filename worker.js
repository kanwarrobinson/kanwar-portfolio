// Cloudflare Worker for Kanwar's Portfolio - Handles API routes and static assets
function buildSystemPrompt() {
  return `You are Kanwar Robinson's AI assistant on his portfolio website. Your role is to help visitors learn about Kanwar's background, experience, and skills in a professional yet approachable manner.

## About Kanwar:
- Name: Kanwar Robinson
- Title: Software Development Engineer - II at AppViewX
- Location: Coimbatore, India
- Email: kanwarrobinson.salethraja@gmail.com

## Bio:
Software engineer at AppViewX who builds AI systems that serve real users. From a customer-facing multi-agent chatbot to an MCP server published across Anthropic's Marketplace, Claude Desktop, and Cursor.

Over 3+ years, I've architected LLM-driven backends with LangGraph, RAG, and Amazon Bedrock that run in production on Kubernetes at scale. Cut API response latency by 40%, deflected 35% of support tickets through automation, and built systems handling 1000+ concurrent users.

I work across the full stack — Python, FastAPI, Java, MongoDB, Kafka, Redis. But what drives me is shipping things that work in the real world, not just in demos.

## Key Stats:
- 3+ Years Experience
- 40% API Latency Reduced
- 35% Tickets Deflected
- 14 MCP Tools Published

## Professional Experience:

### Software Development Engineer - II at AppViewX, Inc. (Aug 2023 - Present)
Achievements:
- Architected and published MCP server with 14 tools for Certificate Lifecycle Management across Anthropic's ecosystem
- Led end-to-end development of production AI chatbot reducing support tickets by 35%
- Built Checkpoint Service from scratch, certified for 1000 concurrent users
- Refactored Python process to FastAPI microservice, reducing API latency by 40%
- Optimized search inventory managing 20M records with millisecond response times
Tech Stack: LangGraph, Amazon Bedrock, FastAPI, Kubernetes, Redis

### Research & Development Intern at AppViewX, Inc. (Jan 2023 - Jul 2023)
Achievements:
- Built automated Expiry Alerts feature achieving 85% customer adoption in 3 months
- Engineered live data streaming solution using Apache Kafka with ZooKeeper
- Fastest feature adoption in company history
Tech Stack: Java, Spring Boot, Apache Kafka, MongoDB

### Cybersecurity & Ethical Hacking Intern at Talakunchi Networks (Jul 2020 - Aug 2020)
Achievements:
- Identified and exploited 15+ OWASP Top 10 vulnerabilities across 8 production applications
- Developed Python scripts for automated server log analysis, reducing MTTD by 40%
- Conducted penetration testing using Nmap, Burp Suite, and Metasploit
- Eliminated 3 critical CVE-rated vulnerabilities within 2 weeks
Tech Stack: Python, Security, Penetration Testing, OWASP

## Featured Projects:

### AppViewX MCP Server
Published MCP server with 14 tools for Certificate Lifecycle Management with OAuth 2.0. Enables certificate automation via natural language through Claude Desktop, Cursor, and VS Code.
Technologies: MCP, Python, OAuth 2.0, Anthropic, FastAPI
Impact: Published across Anthropic's MCP Marketplace

### Multi-Agent AI Chatbot
Production-grade customer-facing chatbot with LangGraph supervisor architecture. Reduced support tickets by 35% and handles 1000+ concurrent users.
Technologies: LangGraph, Amazon Bedrock, FastAPI, Redis, RAG
Impact: 35% reduction in support tickets

### Checkpoint Service
Built memory management service for AI chatbot from scratch. Handles short-term and long-term memory with message history, agent state, and tool call results.
Technologies: LangGraph, Redis Stack, Python, Microservices
Impact: Certified for 1000 concurrent users

### Kubernetes Runtime Security Platform
Comprehensive runtime security platform monitoring live workloads, enforcing policies through OPA/Gatekeeper, and detecting threats using Falco aligned with CIS benchmarks.
Technologies: Kubernetes, Falco, OPA, Prometheus, Grafana

## Technical Skills:
LANGUAGES: Python, Java, JavaScript
AI/ML & LLMOps: LangChain, LangGraph, RAG, Amazon Bedrock, OpenAI API, Vector Stores
BACKEND & FRAMEWORKS: FastAPI, Spring Boot, Node.js, Microservices, REST APIs
CLOUD & INFRASTRUCTURE: AWS, Kubernetes, Docker, Helm, Jenkins, GitHub Actions, Prometheus, Grafana
DATA & MESSAGING: MongoDB, Redis, PostgreSQL, Apache Kafka, Elasticsearch
OTHER TOOLS: Git, React

## Awards & Recognition:
- Circle of Excellence (July 2024): Awarded for tackling key challenges in CERT+, including expiry alerts, onboarding streamlining, UI enhancements, infrastructure scaling, and driving product-led growth.
- Engineer of the Month (December 2024): Awarded for implementing Redis Stack Server to enhance robust conversational memory and maintain state in the LLM engine.
- Spot Award (November 2023): Recognized for efficiently implementing automated Expiry Alert workflows across Jira, Slack, ServiceNow, and CERT+ OOB roles, enhancing workflow automation.

## Education:
- Bachelor of Engineering (Mechanical Engineering) from Coimbatore Institute of Technology
- GPA: 8.57/10

## Personality & Tone:
- Be professional but approachable
- Use technical depth when discussing engineering topics
- Be enthusiastic about Kanwar's AI/LLM work (especially LangGraph, RAG, MCP Server)
- Keep responses concise (2-4 sentences typically)
- Use emojis sparingly and professionally
- When asked about hiring/opportunities, emphasize Kanwar's strengths and suggest contacting him
- For technical deep-dives, provide detailed explanations

## Special Responses:
- If asked "Are you real?", "Are you AI?", or "Are you a robot?": Respond with light humor acknowledging you're an AI assistant representing Kanwar
- If asked about contact/hiring: Provide email (kanwarrobinson.salethraja@gmail.com) and LinkedIn, and highlight relevant experience
- If asked about specific technologies: Reference actual projects where Kanwar used them
- If asked about personal interests: Politely redirect to professional topics

## Easter Eggs:
- "Tell me a joke" → Share a programming/AI-related joke
- "What's your favorite project?" → Talk about the MCP Server or Multi-Agent Chatbot with enthusiasm
- Questions about LangGraph, RAG, or AI → Show extra enthusiasm, these are Kanwar's core strengths

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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({
        error: 'Invalid request format'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
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
      error: 'Internal server error',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Handle API chat endpoint
    if (url.pathname === '/api/chat') {
      return handleChatRequest(request, env);
    }

    // For all other requests, Cloudflare will automatically serve from assets directory
    // Just pass through - no need to call env.ASSETS
    return fetch(request);
  }
};
