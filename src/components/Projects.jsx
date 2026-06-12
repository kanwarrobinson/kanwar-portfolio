import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import '../styles/Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: 'AppViewX MCP Server',
      description: 'Published MCP server with 14 tools for Certificate Lifecycle Management with OAuth 2.0. Enables certificate automation via natural language through Claude Desktop, Cursor, and VS Code.',
      tags: ['MCP', 'Python', 'OAuth 2.0', 'Anthropic', 'FastAPI'],
      featured: true,
      impact: 'Published across Anthropic\'s MCP Marketplace'
    },
    {
      title: 'Multi-Agent AI Chatbot',
      description: 'Production-grade customer-facing chatbot with LangGraph supervisor architecture. Reduced support tickets by 35% and handles 1000+ concurrent users.',
      tags: ['LangGraph', 'Amazon Bedrock', 'FastAPI', 'Redis', 'RAG'],
      featured: true,
      impact: '35% reduction in support tickets'
    },
    {
      title: 'Checkpoint Service',
      description: 'Built memory management service for AI chatbot from scratch. Handles short-term and long-term memory with message history, agent state, and tool call results.',
      tags: ['LangGraph', 'Redis Stack', 'Python', 'Microservices'],
      featured: true,
      impact: 'Certified for 1000 concurrent users'
    },
    {
      title: 'Kubernetes Runtime Security Platform',
      description: 'Comprehensive runtime security platform monitoring live workloads, enforcing policies through OPA/Gatekeeper, and detecting threats using Falco aligned with CIS benchmarks.',
      tags: ['Kubernetes', 'Falco', 'OPA', 'Prometheus', 'Grafana'],
      featured: true
    },
    {
      title: 'Agentic AI Assistant',
      description: 'Multi-agent chatbot with Agentic AI design patterns using LangGraph and RAG. Deployed on GKE with OpenTelemetry tracing and Prometheus/Grafana monitoring.',
      tags: ['LangGraph', 'RAG', 'Kubernetes', 'Docker', 'Helm'],
      featured: false
    },
    {
      title: 'MongoDB Search Optimization',
      description: 'Optimized AppViewX search inventory to manage 20 million records with millisecond response times using advanced query optimization.',
      tags: ['MongoDB', 'Performance', 'Query Optimization'],
      featured: false,
      impact: 'Millisecond response for 20M records'
    }
  ]

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
              className={`project-card ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {project.featured && <div className="featured-badge">Featured</div>}
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
