import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { experience } from './App.jsx'
import './portfolio-pages.css'

const projects = [
  {
    slug: 'omr-evaluation', title: 'OMR Evaluation', category: 'COMPUTER VISION', filters: ['Computer Vision'],
    description: 'A configurable system that turns scanned answer sheets into structured exam results.',
    image: '/omr-scanner-preview.png', imageAlt: 'OMR scanner showing detected answers and a score summary',
    stack: ['Python', 'OpenCV', 'Image Processing'],
    overview: 'A configurable exam evaluation system built for institutions including PEA, Climbbook, Vibrant, NIMS, and Fast Track.',
    points: ['Aligns scanned images and detects answer bubbles.', 'Matches responses against answer keys and scores sheets in batches.', 'Supports custom templates for different exam formats.'],
  },
  {
    slug: 'taayari', title: 'Taayari', category: 'BACKEND / GENAI', filters: ['Backend', 'GenAI'],
    description: 'A high-concurrency assessment backend with automated question-generation workflows.',
    image: '/taayari.jpg', imageAlt: 'Taayari online assessment website',
    stack: ['FastAPI', 'PostgreSQL', 'OpenAI', 'Docker'],
    overview: 'A high-concurrency online assessment backend built at Prism Lab, bringing timed exams, grading, payments, and question generation together.',
    points: ['Built timed submissions, real-time grading, negative marking, and leaderboard aggregation.', 'Designed payment workflows with database locking to prevent credit-purchase race conditions.', 'Implemented OpenAI Batch API workers for question generation with structured schema validation.'],
    externalUrl: 'https://www.instagram.com/p/DdBH_9rior_/', externalLabel: 'View project post',
  },
  {
    slug: 'batch-code-inspection', title: 'Batch Code OCR', category: 'AI / ML', filters: ['AI / ML', 'Computer Vision'],
    description: 'Multilingual inspection software for extracting and validating industrial batch information.',
    image: '/batch-ocr.jpg', imageAlt: 'Industrial OCR inspection interface identifying production information',
    stack: ['Python', 'OpenCV', 'PaddleOCR', 'Tesseract'],
    overview: 'Desktop OCR inspection software developed at Crimson Tech to extract and validate batch codes, manufacturing and expiry dates, and production identifiers.',
    points: ['Combined image processing and OCR for English, Devanagari, and Bengali.', 'Built preprocessing and validation workflows for low-contrast prints and complex backgrounds.', 'Handled missing, unreadable, and incorrectly formatted information.'],
  },
  {
    slug: 'annular-text-rectifier', title: 'Annular Text Rectifier', category: 'COMPUTER VISION', filters: ['Computer Vision'],
    description: 'A NumPy utility that straightens circular-arc text on seals, stamps, and labels for OCR.',
    image: '/annular-text-diagram.jpg', imageAlt: 'Diagram showing polar coordinates applied to circular text',
    stack: ['Python', 'NumPy', 'OCR'],
    overview: 'An open-source, deterministic NumPy-only utility that uses inverse polar mapping to straighten circular-arc text for OCR.',
    points: ['Uses inverse polar mapping to transform text arranged along an arc.', 'Designed for seals, stamps, and labels.', 'Available as a Python package.'],
    externalUrl: 'https://pypi.org/project/annular-text-rectifier/', externalLabel: 'View Python package',
  },
  {
    slug: 'dotcode-extracter', title: 'Dotcode Extracter', category: 'EXTRACTION', filters: ['Computer Vision'],
    description: 'An import-safe Python package for decoding DotCode bitstreams and fixed-grid images.',
    image: '/dotcode-diagram.jpg', imageAlt: 'Diagram showing DotCode extraction and decoding',
    stack: ['Python', 'DotCode', 'Reed–Solomon'],
    overview: 'An import-safe Python package for decoding DotCode bitstreams and cropped, fixed-grid images.',
    points: ['Decodes DotCode bitstreams and cropped fixed-grid images.', 'Includes 5-of-9 mapping and Reed–Solomon logic.', 'Available as a Python package.'],
    externalUrl: 'https://pypi.org/project/dotcode-extracter/', externalLabel: 'View Python package',
  },
]

const filters = ['All Projects', 'AI / ML', 'Backend', 'Computer Vision', 'GenAI']
const projectCardImages = {
  'omr-evaluation': '/figma-work-experience/omr.png',
  taayari: '/figma-work-experience/taayari.png',
  'batch-code-inspection': '/figma-work-experience/batch-ocr.png',
  'annular-text-rectifier': '/figma-work-experience/annular.png',
  'dotcode-extracter': '/figma-work-experience/dotcode.png',
}
const projectCardDescriptions = {
  taayari: 'A high-concurrency assessment backend with automated question generation.',
  'batch-code-inspection': 'Multilingual inspection software for industrial batch information.',
  'annular-text-rectifier': 'Straightens circular-arc text on seals and labels for OCR.',
  'dotcode-extracter': 'A Python package for decoding DotCode bitstreams and fixed-grid images.',
}
const expertise = [
  { title: 'AI & Machine Learning', lines: ['AI & MACHINE', 'LEARNING'], symbol: '✦', description: 'Practical models and intelligent workflows built around real problems.' },
  { title: 'Fullstack Development', lines: ['FULLSTACK', 'DEVELOPMENT'], symbol: '◇', description: 'Reliable APIs, interfaces, data systems, and infrastructure designed to scale.' },
  { title: 'Computer Vision', lines: ['COMPUTER', 'VISION'], symbol: '⊙', description: 'Image processing and OCR for challenging real-world inputs.' },
  { title: 'Generative AI', lines: ['GENERATIVE', 'AI'], symbol: '✧', description: 'Useful generation workflows with structured, dependable outputs.' },
]

function Orbit({ variant = '' }) {
  return <div className={'p-orbit p-orbit-' + variant} aria-hidden="true"><span className="p-orbit-ring p-ring-one" /><span className="p-orbit-ring p-ring-two" /><span className="p-orbit-sphere" /><span className="p-orbit-dot p-dot-one" /><span className="p-orbit-dot p-dot-two" /><span className="p-cross">+</span></div>
}

function AccentStroke() {
  return <svg className="p-accent-stroke" viewBox="0 0 260 34" fill="none" aria-hidden="true"><path d="M4 24C61 14 143 6 211 8M35 28C103 14 185 9 255 16M120 28C164 21 207 17 253 17" /></svg>
}

// A projected spherical mesh keeps the outline fixed while the meridians turn.
function WorkGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context) return undefined

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = 400 * pixelRatio
    canvas.height = 400 * pixelRatio
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    canvas.classList.add('is-ready')

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tilt = 0.22
    const radius = 184
    const cx = 200
    const cy = 200
    const samples = 80
    const meshLines = []
    const addLine = pointAt => {
      const points = []
      for (let i = 0; i <= samples; i += 1) {
        const [lat, lon] = pointAt(i / samples)
        points.push([Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)])
      }
      meshLines.push(points)
    }
    for (let i = -11; i <= 11; i += 1) {
      const latitude = i * Math.PI / 24
      addLine(t => [latitude, t * Math.PI * 2])
    }
    for (let i = 0; i < 36; i += 1) {
      const longitude = i * Math.PI * 2 / 36
      addLine(t => [t * Math.PI - Math.PI / 2, longitude])
    }
    const cosTilt = Math.cos(tilt)
    const sinTilt = Math.sin(tilt)
    let animationFrame = 0
    let visible = true
    let angle = 0
    let lastTime = 0

    function draw(time = 0) {
      if (!motionPreference.matches && lastTime) angle += Math.min(time - lastTime, 80) * 0.00008
      lastTime = time
      context.clearRect(0, 0, 400, 400)

      const shade = context.createRadialGradient(150, 110, 0, cx, cy, radius)
      shade.addColorStop(0, 'rgba(17, 20, 12, .72)')
      shade.addColorStop(0.7, 'rgba(13, 16, 10, .6)')
      shade.addColorStop(1, 'rgba(25, 25, 25, 0)')
      context.beginPath()
      context.arc(cx, cy, radius, 0, Math.PI * 2)
      context.fillStyle = shade
      context.fill()
      context.strokeStyle = 'rgba(130, 155, 32, .35)'
      context.lineWidth = 1.2
      context.stroke()

      const mesh = context.createLinearGradient(60, 35, 325, 375)
      mesh.addColorStop(0, 'rgba(169, 200, 43, .53)')
      mesh.addColorStop(0.56, 'rgba(129, 155, 32, .35)')
      mesh.addColorStop(1, 'rgba(73, 88, 26, .07)')
      context.strokeStyle = mesh
      context.lineWidth = 0.85

      // Rotate the spherical coordinates around Y, then tilt the camera slightly.
      const cosAngle = Math.cos(angle)
      const sinAngle = Math.sin(angle)
      function line(points) {
        context.beginPath()
        let drawing = false
        let previous = null
        for (const [originalX, y, originalZ] of points) {
          const x = originalX * cosAngle + originalZ * sinAngle
          const z = originalZ * cosAngle - originalX * sinAngle
          const screenY = y * cosTilt - z * sinTilt
          const depth = y * sinTilt + z * cosTilt
          const px = cx + x * radius
          const py = cy - screenY * radius
          const current = { x: px, y: py, depth }
          if (previous) {
            if (previous.depth >= 0 && depth >= 0) {
              if (!drawing) context.moveTo(previous.x, previous.y)
              context.lineTo(px, py)
              drawing = true
            } else if ((previous.depth >= 0) !== (depth >= 0)) {
              // Interpolate the horizon crossing so line ends do not pop
              // between adjacent mesh samples as the sphere rotates.
              const fraction = previous.depth / (previous.depth - depth)
              const edgeX = previous.x + (px - previous.x) * fraction
              const edgeY = previous.y + (py - previous.y) * fraction
              if (previous.depth >= 0) {
                if (!drawing) context.moveTo(previous.x, previous.y)
                context.lineTo(edgeX, edgeY)
                drawing = false
              } else {
                context.moveTo(edgeX, edgeY)
                context.lineTo(px, py)
                drawing = true
              }
            } else {
              drawing = false
            }
          }
          previous = current
        }
        context.stroke()
      }

      meshLines.forEach(line)
    }

    function tick(time) {
      draw(time)
      if (visible && !document.hidden && !motionPreference.matches) animationFrame = requestAnimationFrame(tick)
      else animationFrame = 0
    }

    function syncAnimation() {
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
      lastTime = 0
      if (visible && !document.hidden && !motionPreference.matches) animationFrame = requestAnimationFrame(tick)
      else draw()
    }

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation() })
    observer.observe(canvas)
    motionPreference.addEventListener('change', syncAnimation)
    document.addEventListener('visibilitychange', syncAnimation)
    syncAnimation()

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      motionPreference.removeEventListener('change', syncAnimation)
      document.removeEventListener('visibilitychange', syncAnimation)
    }
  }, [])

  return <canvas ref={canvasRef} className="p-work-globe" aria-hidden="true" />
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function SectionLabel({ children }) {
  return <p className="p-label"><span>{children}</span></p>
}

function Tags({ tags }) {
  return <ul className="p-tags" aria-label="Technologies">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
}

function ArrowLink({ onClick, label }) {
  return <button type="button" className="p-arrow" onClick={onClick} aria-label={label}><ArrowRight size={21} strokeWidth={1.6} /></button>
}

function ProjectCard({ project, index, featured = false, total, onOpen }) {
  const reduced = useReducedMotion()
  return <motion.article layout={!reduced} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduced ? 0 : 0.35 }} className={'p-project ' + (featured ? 'p-project-featured' : 'p-project-compact')}>
    <button type="button" className="p-project-image" onClick={() => onOpen(project)} aria-label={'Explore ' + project.title}>
      <img src={projectCardImages[project.slug]} alt={project.imageAlt} loading={featured ? 'eager' : 'lazy'} />
    </button>
    <div className="p-project-copy">
      <div className="p-project-top"><span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span><i /><span className="p-category">{project.category}</span></div>
      <h3><button type="button" onClick={() => onOpen(project)}>{project.title}</button></h3>
      <p>{featured ? project.description : (projectCardDescriptions[project.slug] || project.description)}</p>
      <div className="p-project-bottom"><Tags tags={featured ? project.stack : project.stack.slice(0, 3)} /><ArrowLink onClick={() => onOpen(project)} label={'Read the ' + project.title + ' case study'} /></div>
    </div>
  </motion.article>
}

function PageCTA() {
  return <Reveal className="p-page-cta"><div><span>HAVE AN IDEA?</span> <em>LET’S BUILD IT.</em><AccentStroke /></div><a href="#contact" className="button button-primary">Let’s Talk <ArrowUpRight size={18} /></a></Reveal>
}

export function WorkSection() {
  const [filter, setFilter] = useState('All Projects')
  const [selectedProject, setSelectedProject] = useState(null)
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (selectedProject && dialog && !dialog.open) dialog.showModal()
  }, [selectedProject])
  const visible = filter === 'All Projects' ? projects : projects.filter(project => project.filters.includes(filter))
  return <section id="work" className="portfolio-page work-theme embedded-section" aria-labelledby="selected-work-title">
    <WorkGlobe />
    <div className="p-main">
    <div className="p-work-intro">
      <Orbit variant="work" />
      <Reveal className="p-work-heading"><SectionLabel>02 / SELECTED PROJECTS</SectionLabel><h2 id="selected-work-title">SELECTED <span>WORK.</span><AccentStroke /></h2><p>Turning complex ideas into impactful digital experiences.</p></Reveal>
      <div className="p-filter-bar" role="group" aria-label="Filter projects by discipline">
        {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)}>{filter === item && <span aria-hidden="true" />}{item}</button>)}
      </div>
    </div>
    <div aria-label="Selected projects" className="p-projects-section">
      <p className="p-sr-only" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'} shown</p>
      <motion.div layout className="p-project-grid">
        <AnimatePresence>{visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} featured={index === 0} total={projects.length} onOpen={setSelectedProject} />)}</AnimatePresence>
      </motion.div>
    </div>
    <PageCTA />
    </div>
    <dialog ref={dialogRef} className="p-project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelectedProject(null)}>
      {selectedProject && <div className="p-dialog-content">
        <button type="button" className="p-dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close project details">×</button>
        <p className="p-micro-heading">PROJECT CASE STUDY</p>
        <h2 id="project-dialog-title">{selectedProject.title}</h2>
        <img src={selectedProject.image} alt={selectedProject.imageAlt} />
        <p>{selectedProject.overview}</p>
        <p className="p-micro-heading">WHAT IT DOES</p><ul className="p-achievements">{selectedProject.points.map(point => <li key={point}>{point}</li>)}</ul>
        <p className="p-micro-heading">TECHNOLOGIES</p><Tags tags={selectedProject.stack} />
        {selectedProject.externalUrl && <a className="p-case-external" href={selectedProject.externalUrl} target="_blank" rel="noreferrer">{selectedProject.externalLabel} <ArrowUpRight size={17} /></a>}
      </div>}
    </dialog>
  </section>
}

const journeyEntries = [
  {
    ...experience[0],
    displayDate: 'DEC 2025 — PRESENT',
    displayLocation: 'Kapan, Nepal',
    summary: 'High-concurrency online assessments and generative AI workflows.',
    highlights: ['Built timed submissions, grading, and leaderboards.', 'Designed payment workflows with database locking.', 'Implemented OpenAI Batch API question generation.'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
  },
  {
    ...experience[1],
    displayDate: 'NOV 2024 — DEC 2025',
    displayLocation: 'Lalitpur, Nepal',
    summary: 'Multilingual OCR inspection and scene text recognition.',
    highlights: ['Developed desktop OCR inspection software.', 'Combined image processing and multilingual OCR.', 'Designed an orientation-invariant text spotting pipeline.'],
    technologies: ['Python', 'OpenCV', 'PaddleOCR', 'PyTorch'],
  },
  {
    role: 'Software Developer', company: 'FREELANCE / PROJECTS', dates: 'Jan 2022 – May 2023',
    summary: 'Worked on multiple client projects across document processing, automation, and web systems.',
    highlights: ['Developed an automated OMR evaluation system.', 'Built document management and scanner solutions.', 'Collaborated with education and enterprise clients.'],
    technologies: ['React', 'FastAPI', 'PostgreSQL', 'Docker'], projects: [],
  },
]

const experienceAssets = '/figma-work-experience/'

function AchievementList({ points }) {
  return <ul className="p-achievements">{points.map(point => <li key={point}><img src={experienceAssets + 'bullet.svg'} alt="" /><span>{point}</span></li>)}</ul>
}

function TimelineEntry({ job, index, onOpen }) {
  const companyDivider = ['divider-prism.svg', 'divider-crimson.svg', 'divider-freelance.svg'][index]
  return <Reveal className={'p-timeline-entry p-timeline-entry-' + (index + 1)} delay={index * 0.08}>
    <button className="p-timeline-trigger" type="button" onClick={() => onOpen(job)} aria-label={'View details for ' + job.role + ' at ' + job.company} aria-haspopup="dialog" aria-controls="experience-dialog" />
    <span className="p-timeline-node" aria-hidden="true"><img src={experienceAssets + 'timeline-node.svg'} alt="" /><span>{String(index + 1).padStart(2, '0')}</span></span>
    <div className="p-timeline-date">{job.displayDate || job.dates}</div>
    <div className="p-timeline-body">
      <div className="p-timeline-title"><h3>{index === 1 ? <>Computer Vision Engineer<br />&amp; OCR Analyst</> : job.role}</h3><span className="p-timeline-indicator" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.5} /></span></div>
      <p className="p-company">{job.company}{job.location && <> / {job.displayLocation || job.location}</>}</p>
      <div className="p-company-divider" aria-hidden="true"><img src={experienceAssets + companyDivider} alt="" /></div>
      <p className="p-role-summary">{job.summary}</p>
      <p className="p-micro-heading p-contributions-heading">KEY CONTRIBUTIONS</p>
      <AchievementList points={job.highlights} />
      <p className="p-micro-heading p-technologies-heading">TECHNOLOGIES</p><Tags tags={job.technologies} />
      <div className="p-entry-divider" aria-hidden="true">{index === 0 ? <img src={experienceAssets + 'divider-job.svg'} alt="" /> : <span />}</div>
    </div>
  </Reveal>
}

function Expertise() {
  return <section className="p-expertise"><div className="p-small-accent" /><h3><span>WHAT I BRING</span><span>TO THE <em>TABLE.</em></span></h3><div className="p-expertise-grid">{expertise.map(({ title, lines, symbol, description }) => <div className="p-expertise-item" key={title}><span className="p-expertise-symbol" aria-hidden="true">{symbol}</span><div><h4>{lines[0]}<br />{lines[1]}</h4><p>{description}</p></div></div>)}</div></section>
}

function Impact() {
  const metrics = [['2+', 'Years of experience'], ['10K+', 'Concurrent users handled'], ['5+', 'Projects delivered']]
  return <section className="p-impact" aria-label="Portfolio impact"><div className="p-impact-metrics">{metrics.map(([number, label]) => <div key={number}><strong>{number}</strong><span>{label}</span></div>)}</div><div className="p-impact-actions"><a className="button button-primary" href="#contact">Let’s Talk <ArrowUpRight size={18} /></a></div></section>
}

function useTimelineDrawing(journeyRef, pathRef, reduceMotion) {
  useLayoutEffect(() => {
    const journey = journeyRef.current
    const path = pathRef.current
    if (!journey || !path || reduceMotion) return undefined

    const svg = path.ownerSVGElement
    const markers = [...journey.querySelectorAll('.p-timeline-node')]
    const entries = markers.map(marker => marker.closest('.p-timeline-entry'))
    const length = path.getTotalLength()
    const sampleCount = 240
    const samples = Array.from({ length: sampleCount + 1 }, (_, index) => path.getPointAtLength(length * index / sampleCount))
    let frame = 0
    let disposed = false

    const update = () => {
      frame = 0
      const showTimeline = getComputedStyle(svg).display !== 'none'
      journey.classList.toggle('is-timeline-animated', showTimeline)
      if (!showTimeline) {
        path.style.strokeDashoffset = '0'
        markers.forEach(marker => marker.classList.remove('is-reached'))
        entries.forEach(entry => entry?.classList.remove('is-reached'))
        return
      }

      const matrix = path.getScreenCTM()
      if (!matrix) return
      const points = samples.map(point => ({
        x: point.x * matrix.a + point.y * matrix.c + matrix.e,
        y: point.x * matrix.b + point.y * matrix.d + matrix.f,
      }))
      const revealAt = window.innerHeight * 0.78
      let visibleIndex = 0
      while (visibleIndex < sampleCount && points[visibleIndex + 1].y <= revealAt) visibleIndex += 1
      const progress = points[0].y <= revealAt ? visibleIndex / sampleCount : 0
      path.style.strokeDashoffset = String(1 - progress)

      markers.forEach((marker, markerIndex) => {
        const rect = marker.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        let nearestIndex = 0
        let nearestDistance = Infinity
        points.forEach((point, index) => {
          const distance = (point.x - centerX) ** 2 + (point.y - centerY) ** 2
          if (distance < nearestDistance) { nearestDistance = distance; nearestIndex = index }
        })
        const reached = progress > 0 && visibleIndex >= nearestIndex
        marker.classList.toggle('is-reached', reached)
        entries[markerIndex]?.classList.toggle('is-reached', reached)
      })
    }

    const scheduleUpdate = () => { if (!disposed && !frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(journey)
    document.fonts?.ready.then(scheduleUpdate)
    return () => {
      disposed = true
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      resizeObserver.disconnect()
      cancelAnimationFrame(frame)
      journey.classList.remove('is-timeline-animated')
      path.style.strokeDashoffset = ''
      markers.forEach(marker => marker.classList.remove('is-reached'))
      entries.forEach(entry => entry?.classList.remove('is-reached'))
    }
  }, [journeyRef, pathRef, reduceMotion])
}

export function ExperienceSection() {
  const [selectedJob, setSelectedJob] = useState(null)
  const dialogRef = useRef(null)
  const journeyRef = useRef(null)
  const timelinePathRef = useRef(null)
  const reduceMotion = useReducedMotion()
  useTimelineDrawing(journeyRef, timelinePathRef, reduceMotion)
  useEffect(() => {
    const dialog = dialogRef.current
    if (selectedJob && dialog && !dialog.open) dialog.showModal()
  }, [selectedJob])
  const selectedProjects = selectedJob && (selectedJob.projects.length ? selectedJob.projects : [{
    title: projects[0].title,
    subtitle: projects[0].overview,
    stack: projects[0].stack.join(' · '),
    points: projects[0].points,
  }])
  return <section id="experience" className="portfolio-page experience-theme embedded-section" aria-labelledby="experience-title">
    <div className="p-main">
    <div className="p-journey" ref={journeyRef}>
      <svg className="p-journey-path" width="208.712" height="511.017" viewBox="0 0 208.712 511.017" fill="none" overflow="visible" aria-hidden="true">
        <path ref={timelinePathRef} pathLength="1" d="M207.465 8.22236C16.0319 -48.2113 337.565 297.544 139.334 306.089C-58.8956 314.635 162.501 530.942 0.289669 507.197" stroke="#A01C1C" strokeWidth="4" />
      </svg>
      <img className="p-journey-dots" src="/figma-work-experience/dots.svg" alt="" />
      <Reveal className="p-exp-intro">
        <div className="p-journey-art" aria-hidden="true"><img src="/figma-work-experience/orbit.svg" alt="" /><img src="/figma-work-experience/sphere.svg" alt="" /></div>
        <SectionLabel>03 / EXPERIENCE</SectionLabel><h2 id="experience-title"><span className="p-title-the">THE</span><span className="p-title-journey">JOURNEY.</span><img className="p-journey-underline" src="/figma-work-experience/underline.svg" alt="" /></h2>
      </Reveal>
      <div className="p-journey-tagline"><p>Learning. Building. Evolving.</p><span className="p-red-rule" /></div>
      {journeyEntries.map((job, index) => <TimelineEntry key={job.company} job={job} index={index} onOpen={setSelectedJob} />)}
      <Reveal className="p-journey-expertise"><Expertise /></Reveal>
      <Reveal className="p-journey-impact"><Impact /></Reveal>
    </div>
    </div>
    <dialog id="experience-dialog" ref={dialogRef} className="p-experience-dialog" aria-labelledby="experience-dialog-title" onClose={() => setSelectedJob(null)} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
      {selectedJob && <div className="p-experience-dialog-content">
        <button type="button" className="p-experience-dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close experience details">×</button>
        <p className="p-experience-dialog-date">{selectedJob.displayDate || selectedJob.dates}</p>
        <h2 id="experience-dialog-title">{selectedJob.role}</h2>
        <p className="p-experience-dialog-company">{selectedJob.company}{selectedJob.location && <> / {selectedJob.displayLocation || selectedJob.location}</>}</p>
        <p className="p-experience-dialog-summary">{selectedJob.summary}</p>
        <h3>Key contributions</h3>
        <AchievementList points={selectedJob.highlights} />
        {selectedProjects.map(project => <section className="p-experience-detail-project" key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
          <AchievementList points={project.points} />
          <h4>Technologies</h4>
          <Tags tags={project.stack.split(' · ')} />
          {project.contentUrl && <a href={project.contentUrl} target="_blank" rel="noreferrer">View project post <ArrowUpRight size={16} /></a>}
        </section>)}
      </div>}
    </dialog>
  </section>
}


