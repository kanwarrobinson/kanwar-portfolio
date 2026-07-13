import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiDownload, FiTerminal } from 'react-icons/fi';
import './TerminalChatBot.css';

const STORAGE_KEY = 'kanwar_portfolio_chat_history';
const RATE_LIMIT_KEY = 'kanwar_portfolio_rate_limit';
const MAX_MESSAGES_PER_SESSION = 20;

const TerminalChatBot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
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
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
        content: 'Rate limit reached. Try again tomorrow or email me directly!',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, errorMsg]));
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

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }

      console.error('Chat error:', error);
      const errorMessage = {
        role: 'error',
        content: 'Connection error. Please try again or email me at kanwarrobinson.salethraja@gmail.com',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    if (trimmedInput.toLowerCase() === 'clear') {
      clearChat();
      setInput('');
      return;
    }

    if (trimmedInput.toLowerCase() === 'exit' || trimmedInput.toLowerCase() === 'shutdown') {
      setIsOpen(false);
      setInput('');
      return;
    }

    sendMessage(trimmedInput);
    setInput('');
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportChat = () => {
    const chatText = messages
      .filter(m => m.role !== 'error')
      .map(m => {
        const time = new Date(m.timestamp).toLocaleString();
        const role = m.role === 'user' ? 'visitor' : 'kanwar';
        return `[${time}] ${role}@portfolio:~$ ${m.content}`;
      })
      .join('\n\n');

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="chat-terminal-chatbot-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="chat-terminal-chatbot-container"
            >
              {/* Terminal Header */}
              <div className="chat-terminal-header">
                <div className="chat-terminal-window-buttons">
                  <button className="chat-terminal-btn close" onClick={() => setIsOpen(false)} title="Close">
                    <FiX />
                  </button>
                  <button className="chat-terminal-btn minimize" onClick={clearChat} title="Clear">
                    <FiDownload />
                  </button>
                  <button className="chat-terminal-btn maximize" onClick={exportChat} title="Export">
                    <FiDownload />
                  </button>
                </div>
                <div className="chat-terminal-title">
                  <FiTerminal /> kanwar@portfolio ~ Talk to Kanwar
                </div>
              </div>

              {/* Terminal Banner */}
              <div className="chat-terminal-banner">
                <pre className="chat-terminal-ascii">
{`
 _  __
| |/ /__ _ _ ____      ____ _ _ __
| ' // _\` | '_ \\ \\ /\\ / / _\` | '__|
| . \\ (_| | | | \\ V  V / (_| | |
|_|\\_\\__,_|_| |_|\\_/\\_/ \\__,_|_|
`}
                </pre>
                <p className="chat-terminal-welcome">
                  Welcome to Kanwar's Terminal Chat Interface
                </p>
                <p className="chat-terminal-info">
                  Type your questions below • AI Engineer @ AppViewX • {messageCount}/{MAX_MESSAGES_PER_SESSION} messages used
                </p>
              </div>

              {/* Terminal Messages */}
              <div className="chat-terminal-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`chat-terminal-message chat-terminal-message-${message.role}`}>
                    {message.role === 'user' && (
                      <div className="chat-terminal-prompt">
                        <span className="chat-terminal-prompt-user">visitor@portfolio</span>
                        <span className="chat-terminal-prompt-separator">:</span>
                        <span className="chat-terminal-prompt-path">~</span>
                        <span className="chat-terminal-prompt-symbol">$</span>
                      </div>
                    )}
                    {message.role === 'assistant' && (
                      <div className="chat-terminal-prompt">
                        <span className="chat-terminal-prompt-user chat-terminal-prompt-kanwar">kanwar@appviewx</span>
                        <span className="chat-terminal-prompt-separator">:</span>
                        <span className="chat-terminal-prompt-path">~</span>
                        <span className="chat-terminal-prompt-symbol">&gt;</span>
                      </div>
                    )}
                    <div className="chat-terminal-message-content">
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chat-terminal-loading">
                    <span className="chat-terminal-cursor">▋</span> Kanwar is typing...
                  </div>
                )}
                <form className="chat-terminal-inline-input-form" onSubmit={handleSubmit}>
                  <span className="chat-terminal-prompt-user">visitor@portfolio</span>
                  <span className="chat-terminal-prompt-separator">:</span>
                  <span className="chat-terminal-prompt-path">~</span>
                  <span className="chat-terminal-prompt-symbol">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading || messageCount >= MAX_MESSAGES_PER_SESSION}
                    placeholder="type your message..."
                    className="chat-terminal-inline-input"
                    autoFocus
                  />
                </form>
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="chat-terminal-chat-toggle"
        >
          <FiTerminal size={24} />
        </motion.button>
      )}
    </>
  );
};

export default TerminalChatBot;
