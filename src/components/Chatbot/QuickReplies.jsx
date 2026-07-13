import React from 'react';
import { motion } from 'framer-motion';
import './QuickReplies.css';

const QuickReplies = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="quick-replies"
    >
      <div className="quick-replies-title">Quick suggestions:</div>
      <div className="quick-replies-container">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="quick-reply-button"
            onClick={() => onSelect(suggestion.text)}
          >
            <span className="quick-reply-icon">{suggestion.icon}</span>
            <span className="quick-reply-text">{suggestion.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickReplies;
