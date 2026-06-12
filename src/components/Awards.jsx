import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiAward, FiTrendingUp, FiZap } from 'react-icons/fi'
import '../styles/Awards.css'

const Awards = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const awards = [
    {
      title: 'Circle of Excellence',
      company: 'AppViewX, Inc.',
      date: 'July 2024',
      description: 'Awarded for tackling key challenges in CERT+, including expiry alerts, onboarding streamlining, UI enhancements, infrastructure scaling, and driving product-led growth.',
      icon: <FiAward />
    },
    {
      title: 'Engineer of the Month',
      company: 'AppViewX, Inc.',
      date: 'December 2024',
      description: 'Awarded for implementing Redis Stack Server to enhance robust conversational memory and maintain state in the LLM engine.',
      icon: <FiTrendingUp />
    },
    {
      title: 'Spot Award',
      company: 'AppViewX, Inc.',
      date: 'November 2023',
      description: 'Recognized for efficiently implementing automated Expiry Alert workflows across Jira, Slack, ServiceNow, and CERT+ OOB roles, enhancing workflow automation.',
      icon: <FiZap />
    }
  ]

  return (
    <section id="awards" className="awards-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Awards & Recognition</h2>
          <p className="section-subtitle">Achievements and milestones</p>
        </motion.div>

        <div className="awards-grid">
          {awards.map((award, index) => (
            <motion.div 
              key={index}
              className="award-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="award-icon">{award.icon}</div>
              <div className="award-content">
                <h3 className="award-title">{award.title}</h3>
                <div className="award-meta">
                  <span className="award-company">{award.company}</span>
                  <span className="award-date">{award.date}</span>
                </div>
                <p className="award-description">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Awards
