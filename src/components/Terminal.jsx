import React from 'react'
import { motion } from 'framer-motion'
import '../styles/Terminal.css'

const Terminal = () => {
  return (
    <motion.div 
      className="terminal-window"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
        <div className="terminal-title">developer.js</div>
        <div className="terminal-actions"></div>
      </div>
      <div className="terminal-body">
        <pre className="terminal-code">
          <div className="code-line comment">
            <span className="line-number">1</span>
            <span className="line-content">// Software Engineer</span>
          </div>
          <div className="code-line keyword">
            <span className="line-number">2</span>
            <span className="line-content">const developer = &#123;</span>
          </div>
          <div className="code-line property">
            <span className="line-number">3</span>
            <span className="line-content">
              <span className="key">  name:</span> <span className="value">'Kanwar Robinson'</span>,
            </span>
          </div>
          <div className="code-line property">
            <span className="line-number">4</span>
            <span className="line-content">
              <span className="key">  title:</span> <span className="value">'Software Developer - II'</span>,
            </span>
          </div>
          <div className="code-line property">
            <span className="line-number">5</span>
            <span className="line-content">
              <span className="key">  skills:</span> <span className="value">['FastAPI', 'LangGraph', 'Kubernetes']</span>,
            </span>
          </div>
          <div className="code-line property">
            <span className="line-number">6</span>
            <span className="line-content">
              <span className="key">  focuses:</span> <span className="value">['AI/LLM', 'Microservices Architecture']</span>,
            </span>
          </div>
          <div className="code-line property">
            <span className="line-number">7</span>
            <span className="line-content">
              <span className="key">  learning:</span> <span className="value">'Always'</span>
            </span>
          </div>
          <div className="code-line keyword">
            <span className="line-number">8</span>
            <span className="line-content">&#125;;</span>
          </div>
        </pre>
      </div>
    </motion.div>
  )
}

export default Terminal
