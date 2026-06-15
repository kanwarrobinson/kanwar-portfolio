import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiBook, FiMapPin, FiCalendar } from 'react-icons/fi'
import { getExperience, getEducation } from '../utils/config'
import '../styles/Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState('work')

  const workExperience = getExperience()
  const education = getEducation()

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
                    <div className="company-logo">
                      {job.logo.startsWith('/') ? (
                        <img src={job.logo} alt={job.company} />
                      ) : (
                        <span className="logo-emoji">{job.logo}</span>
                      )}
                    </div>
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
                    <div className="company-logo">
                      <span className="logo-emoji">{edu.logo}</span>
                    </div>
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
