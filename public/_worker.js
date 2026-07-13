export default {
  async fetch(request, env, ctx) {
    // Handle API requests
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      // Your API logic here can access env.OPENAI_API_KEY
      return new Response(JSON.stringify({
        message: 'API endpoint',
        hasKey: !!env.OPENAI_API_KEY
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Serve static assets for all other requests
    return env.ASSETS.fetch(request);
  }
};
