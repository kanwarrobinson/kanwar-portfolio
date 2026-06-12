import configData from '../config.json'

export const config = configData

// Helper functions to get specific data
export const getPersonalInfo = () => config.personal
export const getTerminalData = () => config.terminal
export const getStats = () => config.stats
export const getSkills = () => config.skills
export const getExperience = () => config.experience
export const getEducation = () => config.education
export const getProjects = () => config.projects
export const getAwards = () => config.awards

export default config
