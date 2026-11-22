import { useEffect } from 'react'
import App from './App.jsx'
import { ExperienceSection, WorkSection } from './PortfolioPages.jsx'

export default function PortfolioRouter() {
  useEffect(() => {
    const handleHash = () => {
      const legacySection = window.location.hash.match(/^#\/?(work|experience|about|events)(?:\/.*)?$/)
      if (legacySection) {
        let target = legacySection[1]
        if (target === 'about') target = 'events'
        window.history.replaceState(null, '', '#' + target)
        requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])
  return <App workSection={<WorkSection />} experienceSection={<ExperienceSection />} />
}

