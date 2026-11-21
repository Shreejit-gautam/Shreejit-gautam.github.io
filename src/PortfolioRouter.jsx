import { useEffect } from 'react'
import App from './App.jsx'
import { ExperienceSection, WorkSection } from './PortfolioPages.jsx'

export default function PortfolioRouter() {
  useEffect(() => {
    const legacySection = window.location.hash.match(/^#\/(work|experience)(?:\/.*)?$/)
    if (legacySection) {
      const target = legacySection[1]
      window.history.replaceState(null, '', '#' + target)
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
    }
  }, [])
  return <App workSection={<WorkSection />} experienceSection={<ExperienceSection />} />
}

