import { useEffect } from 'react'
import App from './App.jsx'
import { ExperienceSection, WorkSection } from './PortfolioPages.jsx'

export default function PortfolioRouter() {
  useEffect(() => {
    let scrollFrame = 0
    const handleHash = (initial = false) => {
      cancelAnimationFrame(scrollFrame)
      const legacySection = window.location.hash.match(/^#\/?(work|experience|about|events)(?:\/.*)?$/)
      if (legacySection) {
        let target = legacySection[1]
        if (target === 'about') target = 'events'
        const canonicalHash = '#' + target
        const needsNormalization = window.location.hash !== canonicalHash
        if (needsNormalization) window.history.replaceState(null, '', canonicalHash)
        if (initial || needsNormalization) scrollFrame = requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
      }
    }
    const handleHashChange = () => handleHash()
    handleHash(true)
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      cancelAnimationFrame(scrollFrame)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  return <App workSection={<WorkSection />} experienceSection={<ExperienceSection />} />
}

