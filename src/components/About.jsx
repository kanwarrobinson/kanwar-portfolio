import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiDownload, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import '../styles/About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '40%', label: 'API Latency Reduced' },
    { number: '35%', label: 'Tickets Deflected' },
    { number: '14', label: 'MCP Tools Published' }
  ]

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">AI Engineer who ships production systems</p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="about-heading">Building AI Systems That Actually Ship</h3>
            <p className="about-bio">
              Software engineer at <strong>AppViewX</strong> who builds AI systems that serve real users. 
              From a customer-facing multi-agent chatbot to an MCP server published across Anthropic's Marketplace, 
              Claude Desktop, and Cursor.
            </p>
            <p className="about-bio">
              Over 3+ years, I've architected LLM-driven backends with <strong>LangGraph</strong>, <strong>RAG</strong>, 
              and <strong>Amazon Bedrock</strong> that run in production on Kubernetes at scale. Cut API response latency 
              by 40%, deflected 35% of support tickets through automation, and built systems handling 1000+ concurrent users.
            </p>
            <p className="about-bio">
              I work across the full stack — Python, FastAPI, Java, MongoDB, Kafka, Redis — but what drives me is 
              shipping things that work in the real world, not just in demos.
            </p>

            <div className="about-contact-info">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>kanwarrobinson.salethraja@gmail.com</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+91 6382079802</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>Coimbatore, India</span>
              </div>
            </div>

            <a 
              href="/Kanwar_Resume_May_12_2026.pdf" 
              className="btn btn-primary download-cv"
              download="Kanwar_Robinson_Resume.pdf"
            >
              <FiDownload />
              <span>Download Resume</span>
            </a>
          </motion.div>

          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <h4 className="stat-number">{stat.number}</h4>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
