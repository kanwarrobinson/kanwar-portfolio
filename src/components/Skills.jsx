import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  SiPython, SiFastapi, SiSpring, SiKubernetes,
  SiDocker, SiMongodb, SiRedis, SiApachekafka,
  SiReact, SiNodedotjs, SiGit, SiJenkins, SiGrafana,
  SiHelm, SiPrometheus, SiGithubactions, SiPostgresql, SiElasticsearch
} from 'react-icons/si'
import { FaJava, FaCloud, FaRobot, FaBrain, FaAws } from 'react-icons/fa'
import '../styles/Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: 'LANGUAGES',
      skills: [
        { name: 'Python', icon: <SiPython />, color: '#3776ab' },
        { name: 'Java', icon: <FaJava />, color: '#007396' },
        { name: 'JavaScript', icon: <SiNodedotjs />, color: '#339933' }
      ]
    },
    {
      title: 'AI/ML & LLMOps',
      skills: [
        { name: 'LangChain', icon: <FaBrain />, color: '#8b5cf6' },
        { name: 'LangGraph', icon: <FaRobot />, color: '#8b5cf6' },
        { name: 'RAG', icon: <FaBrain />, color: '#8b5cf6' },
        { name: 'Amazon Bedrock', icon: <FaAws />, color: '#ff9900' },
        { name: 'OpenAI API', icon: <FaBrain />, color: '#10a37f' },
        { name: 'Vector Stores', icon: <FaRobot />, color: '#8b5cf6' }
      ]
    },
    {
      title: 'BACKEND & FRAMEWORKS',
      skills: [
        { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' },
        { name: 'Spring Boot', icon: <SiSpring />, color: '#6db33f' },
        { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
        { name: 'Microservices', icon: <FaCloud />, color: '#8b5cf6' },
        { name: 'REST APIs', icon: <FaCloud />, color: '#61dafb' }
      ]
    },
    {
      title: 'CLOUD & INFRASTRUCTURE',
      skills: [
        { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
        { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
        { name: 'Docker', icon: <SiDocker />, color: '#2496ed' },
        { name: 'Helm', icon: <SiHelm />, color: '#0f1689' },
        { name: 'Jenkins', icon: <SiJenkins />, color: '#d24939' },
        { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088ff' },
        { name: 'Prometheus', icon: <SiPrometheus />, color: '#e6522c' },
        { name: 'Grafana', icon: <SiGrafana />, color: '#f46800' }
      ]
    },
    {
      title: 'DATA & MESSAGING',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
        { name: 'Redis', icon: <SiRedis />, color: '#dc382d' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'Apache Kafka', icon: <SiApachekafka />, color: '#231f20' },
        { name: 'Elasticsearch', icon: <SiElasticsearch />, color: '#005571' }
      ]
    },
    {
      title: 'OTHER TOOLS',
      skills: [
        { name: 'Git', icon: <SiGit />, color: '#f05032' },
        { name: 'React', icon: <SiReact />, color: '#61dafb' }
      ]
    }
  ]

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">SKILLS</p>
          <h2 className="section-title">Technical Expertise</h2>
        </motion.div>

        <div className="skills-wrapper">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-row">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span className="skill-text">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
