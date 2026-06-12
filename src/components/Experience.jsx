import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiBook, FiMapPin, FiCalendar } from 'react-icons/fi'
import '../styles/Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState('work')

  const workExperience = [
    {
      title: 'Software Development Engineer - II',
      company: 'AppViewX, Inc.',
      logo: '🔷', // Replace with actual logo path
      location: 'Coimbatore, India',
      period: 'Aug 2023 - Present',
      type: 'Full-time',
      achievements: [
        'Architected and published MCP server with 14 tools for Certificate Lifecycle Management across Anthropic\'s ecosystem',
        'Led end-to-end development of production AI chatbot reducing support tickets by 35%',
        'Built Checkpoint Service from scratch, certified for 1000 concurrent users',
        'Refactored Python process to FastAPI microservice, reducing API latency by 40%',
        'Optimized search inventory managing 20M records with millisecond response times'
      ],
      tags: ['LangGraph', 'Amazon Bedrock', 'FastAPI', 'Kubernetes', 'Redis']
    },
    {
      title: 'Research & Development Intern',
      company: 'AppViewX, Inc.',
      logo: '🔷',
      location: 'Coimbatore, India',
      period: 'Jan 2023 - Jul 2023',
      type: 'Internship',
      achievements: [
        'Built automated Expiry Alerts feature achieving 85% customer adoption in 3 months',
        'Engineered live data streaming solution using Apache Kafka with ZooKeeper',
        'Fastest feature adoption in company history'
      ],
      tags: ['Java', 'Spring Boot', 'Apache Kafka', 'MongoDB']
    },
    {
      title: 'Cybersecurity & Ethical Hacking Intern',
      company: 'Talakunchi Networks',
      logo: '🔒',
      location: 'Mumbai, India',
      period: 'Jul 2020 - Aug 2020',
      type: 'Internship',
      achievements: [
        'Identified and exploited 15+ OWASP Top 10 vulnerabilities across 8 production applications',
        'Developed Python scripts for automated server log analysis, reducing MTTD by 40%',
        'Conducted penetration testing using Nmap, Burp Suite, and Metasploit',
        'Eliminated 3 critical CVE-rated vulnerabilities within 2 weeks'
      ],
      tags: ['Python', 'Security', 'Penetration Testing', 'OWASP']
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Engineering (Mechanical Engineering)',
      institution: 'Coimbatore Institute of Technology',
      logo: '🎓',
      location: 'Coimbatore, India',
      period: 'Jul 2019 - May 2023',
      gpa: '8.57/10',
      highlights: [
        'Focused on AI/ML and Software Engineering',
        'Built multiple production-grade projects',
        'Active contributor to open-source AI projects'
      ]
    }
  ]

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">My professional journey</p>
        </motion.div>

        <motion.div 
          className="experience-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            <FiBriefcase /> Work Experience
          </button>
          <button 
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <FiBook /> Education
          </button>
        </motion.div>

        <div className="experience-content">
          {activeTab === 'work' && (
            <div className="experience-grid">
              {workExperience.map((job, index) => (
                <motion.div 
                  key={index}
                  className="experience-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="experience-header">
                    <div className="company-logo">{job.logo}</div>
                    <div className="experience-meta">
                      <h3 className="experience-title">{job.title}</h3>
                      <h4 className="experience-company">{job.company}</h4>
                      <div className="experience-info">
                        <span className="info-item">
                          <FiCalendar /> {job.period}
                        </span>
                        <span className="info-item">
                          <FiMapPin /> {job.location}
                        </span>
                        <span className="type-badge">{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="experience-achievements">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>

                  <div className="experience-tags">
                    {job.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="experience-grid">
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  className="experience-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="experience-header">
                    <div className="company-logo">{edu.logo}</div>
                    <div className="experience-meta">
                      <h3 className="experience-title">{edu.degree}</h3>
                      <h4 className="experience-company">{edu.institution}</h4>
                      <div className="experience-info">
                        <span className="info-item">
                          <FiCalendar /> {edu.period}
                        </span>
                        <span className="info-item">
                          <FiMapPin /> {edu.location}
                        </span>
                        <span className="type-badge">GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="experience-achievements">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Experience
