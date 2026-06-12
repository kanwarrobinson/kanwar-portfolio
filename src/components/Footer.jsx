import React from 'react'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">Kanwar Robinson</span>
              <span className="logo-bracket">/&gt;</span>
            </h3>
            <p>Building intelligent AI systems that ship to production.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <div className="footer-social">
                <a href="https://github.com/kanwarrobinson" target="_blank" rel="noopener noreferrer">
                  <FiGithub />
                </a>
                <a href="https://linkedin.com/in/kanwar-robinson" target="_blank" rel="noopener noreferrer">
                  <FiLinkedin />
                </a>
                <a href="mailto:kanwarrobinson.salethraja@gmail.com">
                  <FiMail />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Kanwar Robinson. All rights reserved.</p>
          <p>Built with <FiHeart className="heart-icon" /> using React & Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
