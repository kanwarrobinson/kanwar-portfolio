import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiDownload, FiTrash2 } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickReplies from './QuickReplies';
import { QUICK_REPLY_SUGGESTIONS, getContextualSuggestions } from '../../utils/chatbotPrompt';
import './ChatBot.css';

const STORAGE_KEY = 'kanwar_portfolio_chat_history';
const RATE_LIMIT_KEY = 'kanwar_portfolio_rate_limit';
const MAX_MESSAGES_PER_SESSION = 20;

const ChatBot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(QUICK_REPLY_SUGGESTIONS.initial);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
        if (parsed.length > 0) {
          const lastAssistantMessage = [...parsed].reverse().find(m => m.role === 'assistant');
          if (lastAssistantMessage) {
            setSuggestions(getContextualSuggestions(lastAssistantMessage.content));
          }
        }
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    } else {
      const welcomeMessage = {
        role: 'assistant',
        content: "👋 Hi! I'm Kanwar's AI assistant. I can tell you about his experience building production AI systems, his tech stack, projects, or anything else you'd like to know!",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
    }

    const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
    if (rateLimitData) {
      try {
        const { count, timestamp } = JSON.parse(rateLimitData);
        const hoursPassed = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (hoursPassed < 24) {
          setMessageCount(count);
        } else {
          localStorage.removeItem(RATE_LIMIT_KEY);
        }
      } catch (e) {
        console.error('Failed to parse rate limit data:', e);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateRateLimit = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
      count: newCount,
      timestamp: Date.now()
    }));
  };

  const sendMessage = async (content) => {
    if (messageCount >= MAX_MESSAGES_PER_SESSION) {
      const errorMsg = {
        role: 'error',
        content: '⚠️ You\'ve reached the message limit for today. Please try again tomorrow or contact Kanwar directly via email!',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    const userMessage = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    setIsLoading(true);
    updateRateLimit();

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.filter(m => m.role !== 'error').map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = {
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      };

      const streamedMessages = [...updatedMessages, assistantMessage];
      setMessages(streamedMessages);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices?.[0]?.delta?.content) {
                assistantMessage.content += parsed.choices[0].delta.content;
                setMessages([...updatedMessages, { ...assistantMessage }]);
              }
            } catch (e) {
              console.error('Failed to parse streaming response:', e);
            }
          }
        }
      }

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMessages));

      setSuggestions(getContextualSuggestions(assistantMessage.content));
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }

      console.error('Chat error:', error);
      const errorMessage = {
        role: 'error',
        content: '😔 Sorry, I encountered an error. Please try again or contact Kanwar directly at kanwarrobinson.salethraja@gmail.com',
        timestamp: Date.now()
      };
      const errorMessages = [...updatedMessages, errorMessage];
      setMessages(errorMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(errorMessages));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      const welcomeMessage = {
        role: 'assistant',
        content: "👋 Hi! I'm Kanwar's AI assistant. I can tell you about his experience building production AI systems, his tech stack, projects, or anything else you'd like to know!",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
      setSuggestions(QUICK_REPLY_SUGGESTIONS.initial);
    }
  };

  const exportChat = () => {
    const chatText = messages
      .filter(m => m.role !== 'error')
      .map(m => {
        const time = new Date(m.timestamp).toLocaleString();
        const role = m.role === 'user' ? 'You' : 'Kanwar AI';
        return `[${time}] ${role}:\n${m.content}\n`;
      })
      .join('\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kanwar-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="chatbot-container"
          >
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">🤖</div>
                <div className="chatbot-header-text">
                  <h3>Talk to Kanwar</h3>
                  <p className="chatbot-status">
                    <span className="status-dot"></span>
                    AI Assistant • Online
                  </p>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button
                  onClick={exportChat}
                  className="chatbot-icon-button"
                  title="Export chat"
                >
                  <FiDownload />
                </button>
                <button
                  onClick={clearChat}
                  className="chatbot-icon-button"
                  title="Clear chat"
                >
                  <FiTrash2 />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="chatbot-icon-button"
                  title="Close chat"
                >
                  <FiX />
                </button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} theme={theme} />
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="typing-indicator"
                >
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!isLoading && messages.length > 0 && (
              <QuickReplies
                suggestions={suggestions}
                onSelect={handleQuickReply}
              />
            )}

            <div className="chatbot-footer">
              <div className="rate-limit-indicator">
                {messageCount}/{MAX_MESSAGES_PER_SESSION} messages today
              </div>
              <ChatInput
                onSend={sendMessage}
                disabled={isLoading || messageCount >= MAX_MESSAGES_PER_SESSION}
                placeholder={
                  messageCount >= MAX_MESSAGES_PER_SESSION
                    ? "Message limit reached..."
                    : "Ask me anything about Kanwar..."
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>
    </>
  );
};

export default ChatBot;
