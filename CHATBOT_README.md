# 🤖 Talk to Kanwar - AI Chatbot

An intelligent, production-ready AI chatbot for Kanwar's portfolio website. Built with React, OpenAI GPT-4o-mini, and Cloudflare Workers.

## ✨ Features Implemented

### Core Features
- ✅ **Persistent Chat History** - Client-side localStorage caching preserves conversations across sessions
- ✅ **Context-Aware Responses** - Uses config.json as knowledge base for accurate information
- ✅ **Typing Indicators** - Realistic chat experience with animated typing dots
- ✅ **Mobile Responsive** - Fully responsive design works on all devices
- ✅ **Smooth Animations** - Powered by Framer Motion for polished UX

### Advanced Features
1. 🎯 **Smart Suggestions (Quick Replies)**
   - Context-aware suggestion buttons that adapt based on conversation
   - Categories: AI Experience, Projects, Tech Stack, Contact
   - One-click responses for common questions

2. ⚡ **Streaming Responses**
   - Token-by-token display (like ChatGPT)
   - Real-time response rendering
   - Shows progress as AI thinks and responds

3. 🎭 **Personality Customization**
   - Professional yet approachable tone
   - Technical depth for engineering discussions
   - Enthusiastic about AI/LLM work
   - Includes easter eggs (try asking for a joke!)

4. 🔒 **Security & Rate Limiting**
   - 20 messages per session limit
   - 30 messages per day per IP
   - Token usage monitoring
   - Sanitized responses with markdown support

5. 🌙 **Theme Awareness**
   - Automatically adapts to portfolio's dark/light theme
   - Consistent design language
   - Smooth theme transitions

6. 💬 **Chat Export**
   - Download conversation as text file
   - Timestamped messages
   - Easy to share or reference

## 🏗️ Architecture

### Frontend (React)
```
src/components/Chatbot/
├── ChatBot.jsx          # Main chatbot component with state management
├── ChatMessage.jsx      # Individual message component with markdown support
├── ChatInput.jsx        # Input field with auto-resize and keyboard shortcuts
├── QuickReplies.jsx     # Smart suggestion buttons
└── *.css                # Themed styles for each component
```

### Backend (Cloudflare Worker)
```
public/_worker.js        # Edge runtime API handler
├── /api/chat           # Main chat endpoint
├── System prompt       # Injected from config.json
└── OpenAI streaming    # GPT-4o-mini integration
```

### Utilities
```
src/utils/chatbotPrompt.js
├── buildSystemPrompt()           # Constructs AI personality
├── QUICK_REPLY_SUGGESTIONS       # Predefined suggestion sets
└── getContextualSuggestions()    # Dynamic suggestion logic
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install react-markdown react-syntax-highlighter
```

### 2. Add OpenAI API Key to Cloudflare
After deploying to Cloudflare Pages:

1. Go to **Cloudflare Dashboard** → Your Worker → **Settings**
2. Navigate to **Variables and secrets**
3. Click **Add variable**
4. Set:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - ✅ **Check "Encrypt"** to make it a secret
5. Click **Save**

### 3. Deploy
```bash
npm run build
git add .
git commit -m "Add AI chatbot feature"
git push origin main
```

Cloudflare will auto-deploy from git push.

### 4. Local Development
For local testing with Wrangler:

```bash
# Create .dev.vars file (DO NOT commit this)
echo "OPENAI_API_KEY=your-key-here" > .dev.vars

# Run local dev server
npx wrangler pages dev dist --compatibility-date=2026-07-10
```

## 💡 Usage

### For Visitors
1. Click the floating chat button (bottom-right)
2. Type a question or click a quick reply
3. Watch as AI streams responses in real-time
4. Export chat history or clear conversation anytime

### Common Questions Handled
- "Tell me about your AI experience"
- "What's your tech stack?"
- "Show me your projects"
- "How can I contact you?"
- "Tell me about the MCP Server"
- "What's LangGraph?"

### Easter Eggs
- "Tell me a joke" → Programming humor
- "Are you a robot?" → Witty acknowledgment
- "What's your favorite project?" → Enthusiastic response about MCP/Chatbot

## 🎨 Customization

### Modify AI Personality
Edit `src/utils/chatbotPrompt.js` to change:
- Tone and style
- Response length
- Technical depth
- Quick reply suggestions

### Change Rate Limits
In `src/components/Chatbot/ChatBot.jsx`:
```javascript
const MAX_MESSAGES_PER_SESSION = 20; // Adjust as needed
```

In `public/_worker.js`:
```javascript
const RATE_LIMIT_PER_IP = 30; // Daily limit per IP
```

### Styling
Each component has its own CSS file in `src/components/Chatbot/`:
- `ChatBot.css` - Main container and toggle button
- `ChatMessage.css` - Message bubbles and markdown
- `ChatInput.css` - Input field styling
- `QuickReplies.css` - Suggestion buttons

## 📊 Cost Optimization

### OpenAI Usage
- **Model**: GPT-4o-mini
- **Pricing**: $0.15/1M input tokens, $0.60/1M output tokens
- **Limits**: 500 tokens per response
- **Rate Limits**: 20 messages/session, 30/day per IP

### Estimated Costs
- **Light traffic** (50 visitors/day): ~$2-3/month
- **Moderate traffic** (100 visitors/day): ~$5-10/month
- **Heavy traffic** (500 visitors/day): ~$20-30/month

### Optimization Strategies
1. ✅ Use GPT-4o-mini (cheaper than GPT-4)
2. ✅ Limit token count (500 max)
3. ✅ Rate limiting (prevents abuse)
4. ✅ Context window management (only last 10 messages)
5. ⚡ Edge caching for common questions (optional)

## 🔒 Security Features

1. **Rate Limiting**
   - Per-session message limits
   - Per-IP daily limits
   - Token budget monitoring

2. **Input Sanitization**
   - Markdown rendering with safe HTML
   - XSS protection via React
   - External link safety (target="_blank")

3. **API Key Security**
   - Environment variables (not in code)
   - Encrypted secrets in Cloudflare
   - Server-side only (never exposed to client)

4. **Error Handling**
   - Graceful failures
   - User-friendly error messages
   - Fallback contact information

## 🧪 Testing Checklist

- [ ] Chat opens/closes smoothly
- [ ] Messages persist across page reloads
- [ ] Quick replies work and update contextually
- [ ] Streaming responses display correctly
- [ ] Rate limits enforce properly
- [ ] Export chat downloads correctly
- [ ] Clear chat prompts for confirmation
- [ ] Mobile responsive (test on phone)
- [ ] Theme switching works (dark/light)
- [ ] Error handling displays properly
- [ ] Markdown rendering (code blocks, links, lists)
- [ ] Typing indicators show during responses

## 🎯 Key Files Reference

| File | Purpose |
|------|---------|
| `src/components/Chatbot/ChatBot.jsx` | Main component with state & API calls |
| `src/components/Chatbot/ChatMessage.jsx` | Message rendering with markdown |
| `src/components/Chatbot/ChatInput.jsx` | User input field |
| `src/components/Chatbot/QuickReplies.jsx` | Suggestion buttons |
| `src/utils/chatbotPrompt.js` | AI personality & system prompt |
| `public/_worker.js` | Cloudflare Worker API handler |
| `src/App.jsx` | Chatbot integration |

## 🐛 Troubleshooting

### Chat not appearing?
- Check if `ChatBot` is imported in `App.jsx`
- Verify theme prop is passed: `<ChatBot theme={theme} />`

### API errors?
- Confirm `OPENAI_API_KEY` is set in Cloudflare
- Check browser console for error messages
- Verify worker is deployed (check Cloudflare dashboard)

### Streaming not working?
- Ensure OpenAI API key has access to GPT-4o-mini
- Check network tab for streaming response
- Verify CORS headers in worker

### Messages not persisting?
- Check browser localStorage (should see `kanwar_portfolio_chat_history`)
- Verify localStorage is not disabled
- Try clearing and restarting chat

## 🚦 Next Steps (Optional Enhancements)

1. **Analytics Integration**
   - Track popular questions
   - Understand visitor interests
   - A/B test responses

2. **Advanced Features**
   - Voice input/output
   - Multi-language support
   - Sentiment analysis
   - Lead capture form integration

3. **Performance**
   - Edge caching for common queries
   - Response compression
   - Lazy loading

4. **Monitoring**
   - Error tracking (Sentry)
   - Usage analytics (PostHog)
   - Cost monitoring dashboard

## 📝 License

This chatbot is part of Kanwar Robinson's portfolio project.

---

Built with ❤️ using React, OpenAI, and Cloudflare Workers
