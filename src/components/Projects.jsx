import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getProjects } from '../utils/config'
import '../styles/Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = getProjects()

  const getProjectClassName = (project) => [
    "project-card",
    project.featured ? "featured" : "",
    project.personal ? "personal" : "",
    (project.featured || project.personal) ? "has-badges" : ""
  ].filter(Boolean).join(" ")

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Production systems that ship</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={getProjectClassName(project)}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {(project.featured || project.personal) && (
                <div className="project-badges">
                  {project.featured && <span className="project-badge featured-badge">Featured</span>}
                  {project.personal && <span className="project-badge personal-badge">Personal</span>}
                </div>
              )}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.impact && (
                  <div className="project-impact">
                    <span className="impact-badge">{project.impact}</span>
                  </div>
                )}
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
