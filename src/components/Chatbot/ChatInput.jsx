import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import './ChatInput.css';

const ChatInput = ({ onSend, disabled, placeholder = "Ask me anything about Kanwar..." }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="chat-input-textarea"
        rows={1}
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="chat-send-button"
      >
        <FiSend />
      </button>
    </form>
  );
};

export default ChatInput;
