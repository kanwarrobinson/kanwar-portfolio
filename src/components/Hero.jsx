import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import Terminal from './Terminal'
import '../styles/Hero.css'

const Hero = () => {
  const titles = [
    'AI Engineer',
    2000,
    'Software Developer',
    2000,
    'Backend Architect',
    2000,
    'LangGraph Specialist',
    2000,
  ]

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-text">
            <motion.h1 
              className="hero-greeting"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm <span className="gradient-text">Kanwar Robinson</span>
            </motion.h1>

            <motion.h2 
              className="hero-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TypeAnimation
                sequence={titles}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="typing-text"
              />
            </motion.h2>

            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Building intelligent, production-ready AI systems that scale. 
              From LangGraph multi-agent architectures to MCP servers published across Anthropic's ecosystem.
            </motion.p>

            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#projects" className="btn btn-primary">
                <span>View My Work</span>
                <FiArrowDown />
              </a>
              <a href="#contact" className="btn btn-outline">
                <span>Get In Touch</span>
                <FiMail />
              </a>
            </motion.div>

            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <a href="https://github.com/kanwarrobinson" target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/kanwar-robinson" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </a>
              <a href="mailto:kanwarrobinson.salethraja@gmail.com">
                <FiMail />
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="hero-terminal"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Terminal />
          </motion.div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll Down</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
