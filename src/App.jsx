import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { getSiteHostname } from './siteDomain.js'
import {
  ArrowDown, ArrowUpRight, Award, BrainCircuit, Calendar, CheckCircle2, ChevronLeft,
  ChevronRight, Code2, Download, Github, Instagram,
  Linkedin, Mail, MapPin, Maximize2, Menu, ScanEye, Sparkles, Trophy, Users, X,
} from 'lucide-react'

const navigation = [
  ['Home', 'home'],
  ['Work', 'work'],
  ['Experience', 'experience'],
  ['Events', 'events'],
  ['Contact', 'contact'],
]

export const socialLinks = [
  { label: 'GitHub profile', href: 'https://github.com/Shreejit-gautam', Icon: Github },
  { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/shreejit-gautam-a84056437/', Icon: Linkedin },
  { label: 'Instagram profile', href: 'https://www.instagram.com/shree_jit00/', Icon: Instagram },
  { label: 'LeetCode profile', href: 'https://leetcode.com/u/xf9w12Vdy4/', Icon: Code2 },
  { label: 'Email Shreejit', href: 'mailto:shreejitgautam4@gmail.com', Icon: Mail },
]

const capabilities = [
  { label: 'AI / ML', Icon: BrainCircuit },
  { label: 'Backend', Icon: Code2 },
  { label: 'Computer Vision', Icon: ScanEye },
  { label: 'GenAI', Icon: Sparkles },
]

const projects = [
  {
    number: '01',
    category: 'COMPUTER VISION / PYTHON',
    title: 'Annular Text\nRectifier',
    text: 'A deterministic NumPy-only utility that uses inverse polar mapping to straighten circular-arc text on seals, stamps, and labels for OCR.',
    url: 'https://pypi.org/project/annular-text-rectifier/',
    visual: 'annular',
    image: '/annular-text-diagram.jpg',
  },
  {
    number: '02',
    category: 'EXTRACTION / PYTHON',
    title: 'Dotcode\nExtracter',
    text: 'An import-safe Python package for decoding DotCode bitstreams and cropped, fixed-grid images, with 5-of-9 mapping and Reed–Solomon logic.',
    url: 'https://pypi.org/project/dotcode-extracter/',
    visual: 'dotcode',
    image: '/dotcode-diagram.jpg',
  },
]

export const experience = [
  {
    role: 'Backend & GenAI Engineer', company: 'Prism Lab Pvt. Ltd.', dates: 'Dec 2025 — Present', location: 'Kapan, Budhanilkantha, Nepal',
    projects: [{ title: 'Taayari', subtitle: 'High-concurrency online assessment backend', stack: 'Python 3.12 · FastAPI · PostgreSQL · SQLModel · SQLAlchemy · AWS SES · Docker · Traefik', contentUrl: 'https://www.instagram.com/p/DdBH_9rior_/', points: [
      'Built an assessment engine for timed submissions, real-time grading, negative marking, and leaderboard aggregation.',
      'Designed eSewa wallet and manual QR payment workflows with pessimistic database locking to prevent credit-purchase race conditions.',
      'Implemented OpenAI Batch API workers for question generation with token budgets and structured schema validation.',
      'Built reliable transactional and marketing email processing with AWS SES, worker leases, and throttling handling.',
      'Established deployment with Docker multi-stage builds, Alembic migrations, Traefik, and automated Let’s Encrypt certificates.',
    ] }],
  },
  {
    role: 'Computer Vision Engineer & OCR Analyst', company: 'Crimson Tech Pvt. Ltd.', dates: 'Nov 2024 — Dec 2025', location: 'Balkumari, Lalitpur, Nepal',
    projects: [
      { title: 'Multilingual batch code inspection', subtitle: 'Surya Nepal · ITC · Dabur', stack: 'Python · OpenCV · Tesseract · PaddleOCR · EasyOCR', points: [
        'Developed desktop OCR inspection software to extract and validate batch codes, manufacturing and expiry dates, and production identifiers.',
        'Combined image processing, contour and connected-component analysis, rule-based recognition, and deep learning OCR for English, Devanagari, and Bengali.',
        'Built preprocessing and validation workflows for low-contrast prints, complex backgrounds, and missing, unreadable, or incorrectly formatted information.',
      ] },
      { title: 'Arbitrary-shaped scene text recognition', subtitle: 'Siemens industrial application', stack: 'Python · PyTorch · OpenCV · DBNet · CRNN · CTC', points: [
        'Designed an orientation-invariant text spotting pipeline for curved, rotated, and irregular text in industrial imagery.',
        'Used DBNet for segmentation-based localization, geometric rectification for distorted regions, and CRNN with CTC decoding for recognition.',
      ] },
    ],
  },
]

function InstagramPreview({ url }) {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds?.process()
    let script = document.querySelector('script[src="https://www.instagram.com/embed.js"]')
    if (!script) {
      script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', process)
    process()
    return () => script.removeEventListener('load', process)
  }, [])

  return <div className="instagram-preview"><blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14"><a href={url} target="_blank" rel="noreferrer">View this post on Instagram</a></blockquote></div>
}

function MagneticLink({ children, className = '', href, ...props }) {
  return <a href={href} className={`magnetic ${className}`} data-magnetic {...props}>{children}</a>
}

function BrandMark() {
  return <a className="monogram" href="#home" aria-label="Shreejit Gautam, back to home"><span>S</span><i>/</i><span>G</span></a>
}

function HeaderAction({ contact = false, onContactClick }) {
  const downloadResume = !contact && getSiteHostname() === 'shreejit.me'
  const href = contact ? '#contact' : downloadResume ? '/Shreejit_Gtm.pdf' : '/shreejit-gautam-cv.pdf'
  return <a className="header-cta" href={href} download={downloadResume ? 'Shreejit_Gtm.pdf' : undefined} target={!contact && !downloadResume ? '_blank' : undefined} rel={!contact && !downloadResume ? 'noreferrer' : undefined} onClick={contact ? onContactClick : undefined}>
    {contact ? <>Let’s Talk <ArrowUpRight size={16} strokeWidth={2} /></> : <><Download size={16} strokeWidth={2} /> Resume</>}
  </a>
}

export function Header({ active, menuOpen, setMenuOpen }) {
  const [visible, setVisible] = useState(false)
  const [darkBackground, setDarkBackground] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    let hideTimer
    const updateHeader = () => {
      const section = [...document.querySelectorAll('main > section')].find(element => {
        const rect = element.getBoundingClientRect()
        return rect.top <= 36 && rect.bottom > 36
      })
      setDarkBackground(section?.id === 'work' || section?.id === 'events' || section?.id === 'contact')
      const hero = document.getElementById('home')
      setPastHero(Boolean(hero && hero.getBoundingClientRect().bottom <= 0))
    }
    const scheduleHide = () => {
      window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => {
        if (!menuOpen && !headerRef.current?.contains(document.activeElement) && !document.activeElement?.classList.contains('nav-reveal')) setVisible(false)
      }, 2200)
    }
    const handleScroll = () => { updateHeader(); setVisible(true); scheduleHide() }
    const handleFocusOut = () => scheduleHide()
    updateHeader()
    if (!menuOpen) scheduleHide()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateHeader)
    document.addEventListener('focusout', handleFocusOut)
    return () => {
      window.clearTimeout(hideTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeader)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [menuOpen])

  return (
    <>
    <button type="button" className="nav-reveal" onFocus={() => setVisible(true)} onClick={() => setVisible(true)}>Show navigation</button>
    <header ref={headerRef} className={`site-header ${active === 'home' ? 'is-hero' : ''} ${darkBackground ? 'is-dark' : ''} ${visible ? '' : 'is-hidden'}`} inert={!visible}>
      <BrandMark />
      <div className="header-rule" aria-hidden="true"><span>PORTFOLIO / 2026</span></div>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" id="main-navigation">
        {navigation.map(([name, target]) => (
          <a key={target} href={`#${target}`} className={active === target.replace('/', '') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            {name}
          </a>
        ))}
      </nav>
      <HeaderAction contact={pastHero} onContactClick={() => setMenuOpen(false)} />
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
    </>
  )
}

export function SocialRail() {
  const railRef = useRef(null)
  const [darkLinks, setDarkLinks] = useState(() => socialLinks.map(() => false))

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const sections = [...document.querySelectorAll('main > section')].map(section => ({ id: section.id, rect: section.getBoundingClientRect() }))
      const links = [...(railRef.current?.querySelectorAll('.social-links a') || [])]
      const next = links.map(link => {
        const rect = link.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const section = sections.find(item => item.rect.top <= center && item.rect.bottom > center)
        return section?.id === 'work' || section?.id === 'events' || section?.id === 'contact'
      })
      setDarkLinks(previous => next.length === previous.length && next.every((value, index) => value === previous[index]) ? previous : next)
    }
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={railRef} className={`social-rail ${darkLinks.some(Boolean) ? 'is-dark' : ''}`}>
      <span className="rail-line" />
      <div className="social-links">
        {socialLinks.map(({ label, href, Icon }, index) => (
          <a className={darkLinks[index] ? 'is-dark' : ''} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} key={label}><Icon size={17} strokeWidth={1.7} /></a>
        ))}
      </div>
      <span className="rail-dot" />
      <span className="rail-line bottom" />
    </div>
  )
}

function AnimatedStat({ value, reduceMotion }) {
  const [count, setCount] = useState(reduceMotion ? value : 1)
  const statRef = useRef(null)

  useEffect(() => {
    if (reduceMotion) {
      setCount(value)
      return undefined
    }

    const node = statRef.current
    if (!node) return undefined
    let tween
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const progress = { value: 1 }
      tween = gsap.to(progress, {
        value,
        delay: 0.65,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => setCount(Math.floor(progress.value)),
        onComplete: () => setCount(value),
      })
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => { observer.disconnect(); tween?.kill() }
  }, [value, reduceMotion])

  const display = count >= 1000 ? `${(Math.floor(count / 100) / 10).toFixed(1).replace(/\.0$/, '')}K` : String(count)
  const accessibleValue = value === 5000 ? '5 thousand plus' : `${value} plus`
  return <strong ref={statRef}><span className="sr-only">{accessibleValue}</span><span className="stat-value" aria-hidden="true">{display}</span><span aria-hidden="true">+</span></strong>
}

function Hero({ heroRef, reduceMotion, introComplete = true }) {
  const entrance = (delay = 0, y = 24) => reduceMotion ? {} : {
    initial: { opacity: 0, y },
    animate: introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }
  return (
    <section className="hero" id="home" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-identity">
        <BrandMark />
        <div className="header-rule" aria-hidden="true"><span>PORTFOLIO / 2026</span></div>
        <HeaderAction />
      </div>
      <div className="hero-grid" aria-hidden="true">
        <img src="/figma-hero/hero-grid.svg" alt="" className="hero-grid-svg" loading="eager" decoding="async" />
      </div>
      <div className="corner-arc" aria-hidden="true">
        <img src={reduceMotion ? '/figma-hero/corner-arc-static.svg' : '/figma-hero/corner-arc.svg'} alt="" loading="eager" decoding="async" />
      </div>

      <motion.div className="hero-topline" {...entrance(0.05)}>
        <span><b>Hi,</b> Iam</span>
      </motion.div>
      <motion.div className="availability" {...entrance(0.3)}>
        <span className="availability-dot" /> INDEPENDENT DEVELOPER
      </motion.div>

      <div className="hero-art absolute inset-0 pointer-events-none" aria-hidden="true">
        <img className="hero-fine-orbit" src={reduceMotion ? '/figma-hero/fine-orbit-static.svg' : '/figma-hero/fine-orbit.svg'} alt="" loading="eager" decoding="async" />
        <img className="hero-lower-orbit" src={reduceMotion ? '/figma-hero/lower-orbit-static.svg' : '/figma-hero/lower-orbit.svg'} alt="" loading="eager" decoding="async" />
        <div className="orbit-cross">+</div>
        <img className="art-sphere" src="/figma-hero/sphere-3d.svg" data-parallax="sphere" alt="" loading="eager" decoding="async" />
        <img className="art-dots" src="/figma-hero/dot-grid.svg" alt="" loading="eager" decoding="async" />
        <img className="art-index" src="/figma-hero/art-index.svg" alt="FIG. 01 — CREATIVE IN MOTION" loading="eager" decoding="async" />
        <div className="hero-ground-frame"><img className="hero-ground" src="/figma-hero/ground.svg" alt="" loading="eager" decoding="async" /></div>
      </div>

      <motion.div className="name-block" {...entrance(0.12, 38)}>
        <h1 id="hero-title" className="name-visual">
          <span className="name-shreejit">SHREEJIT</span>
          <span className="name-gautam-row">
            <span className="name-gautam">GAUTAM</span>
            <img className="name-swoosh" src="/figma-hero/swoosh.svg" alt="" loading="eager" decoding="async" />
          </span>
        </h1>
      </motion.div>

      <div className="portrait-mask" aria-hidden="true">
        <img className="portrait-echo portrait-echo-far" src="/figma-hero/portrait-echo.png" alt="" loading="eager" decoding="async" />
        <img className="portrait-echo portrait-echo-near" src="/figma-hero/portrait-echo.png" alt="" loading="eager" decoding="async" />
      </div>
      <motion.div className="portrait-wrap" {...entrance(0.18, 35)}>
        <img className="portrait" src="/figma-hero/portrait.png" alt="Shreejit Gautam wearing a burgundy shirt" loading="eager" fetchpriority="high" decoding="async" />
      </motion.div>

      <div className="hero-copy">
        <motion.p className="role-line" {...entrance(0.35)}><span /> Developer. Designer. Creator.</motion.p>
        <motion.p className="hero-description" {...entrance(0.42)}>Turning ideas into code, content, and<br className="desktop-break" /> meaningful digital experiences.</motion.p>
        <motion.div className="hero-actions" {...entrance(0.49)}>
          <MagneticLink href="#work" className="button button-primary">Explore my work <ArrowUpRight size={18} /></MagneticLink>
          <MagneticLink href="#contact" className="button button-outline">Let’s talk <ArrowUpRight size={18} /></MagneticLink>
        </motion.div>
        <motion.div className="capabilities" {...entrance(0.56)}>
          {capabilities.map(({ label, Icon }) => <span key={label}><Icon size={15} strokeWidth={1.7} />{label}</span>)}
        </motion.div>
      </div>

      <div className="creative-mantra" aria-hidden="true">THINK<br />MAKE<br />CREATE<span className="side-period">.</span></div>
      <motion.div className="hero-side" {...entrance(0.55)}>
        <span className="side-accent" aria-hidden="true" />
        <div className="side-stat"><AnimatedStat value={2} reduceMotion={reduceMotion} /><p>Years of<br />experience</p></div>
        <div className="side-stat"><AnimatedStat value={5000} reduceMotion={reduceMotion} /><p>Concurrent<br />users handled</p></div>
        <div className="side-stat"><AnimatedStat value={5} reduceMotion={reduceMotion} /><p>Projects<br />delivered</p></div>
      </motion.div>

      <a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><span className="scroll-circle"><ArrowDown size={18} /></span></a>
      <div className="hero-bottom-note"><span>DESIGN × DEVELOPMENT</span><span>MADE TO MAKE AN IMPACT</span></div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="content-section work-section">
      <div className="section-heading">
        <div><p className="eyebrow"><span>02</span> / SELECTED WORK</p><h2>IDEAS, MEET<br /><em>EXECUTION.</em></h2></div>
        <p className="section-intro">A selection of things I’ve made, explored, and put into the world.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <a className="project-card" href={project.url} target="_blank" rel="noreferrer" key={project.title}>
            <div className={`project-visual ${project.visual}`} aria-hidden="true">
              <span className="project-visual-number">{project.number} / 02</span>
              <div className="project-orbit one" /><div className="project-orbit two" />
              <div className="project-object">{project.visual === 'annular' ? 'Aa' : '●●'}<span>✳</span></div>
              <span className="project-open"><ArrowUpRight size={21} /></span>
            </div>
            <div className="project-meta"><span>{project.category}</span><span>VIEW PROJECT ↗</span></div>
            <h3>{project.title}</h3><p>{project.text}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export const eventsData = [
  {
    id: 'mbmc-ideax-2024',
    number: '01',
    category: 'Winner · Agrotech',
    badge: 'Track Winner · Agrotech',
    badgeType: 'winner',
    theme: 'Agriculture & Technology',
    title: 'MBMC IdeaX 2024',
    subtitle: 'Agrotech Theme Winner · 1st Place',
    organizer: 'School of Science and Technology, Madan Bhandari Memorial College',
    dates: 'September 27 – 29, 2024',
    location: 'Kathmandu, Nepal',
    team: 'Team Botanical',
    prize: 'Rs. 10,000 Cash Prize & Certificate of Appreciation',
    description:
      'Secured 1st place in the Agriculture and Technology (AgroTech) track at MBMC IdeaX 2024. Collaborated with Team Botanical to engineer and pitch an innovative agricultural technology concept designed to address critical challenges in crop health, smart detection, and real-time farmer advisory. Conferred the official Certificate of Appreciation and the Track Winner award by college leadership and the School of Science and Technology.',
    highlights: [
      'Architected the solution and delivered the live technical pitch before the jury panel.',
      'Clinched 1st place in the Agrotech track among competing multi-disciplinary collegiate teams.',
      'Honored with the official Certificate of Appreciation and the Rs. 10,000 Track Winner cheque.',
    ],
    photos: [
      {
        src: '/events/mbmc-ideax-2024-stage.jpg',
        title: 'Track Winner Award Ceremony',
        label: 'Stage & Cheque',
        caption: 'Team Botanical holding the Track Winner (Agro Tech) cheque of Rs. 10,000 on stage with MBMC leadership.',
      },
      {
        src: '/events/mbmc-ideax-2024-certificate.jpg',
        title: 'Certificate of Appreciation',
        label: 'Official Certificate',
        caption: 'Conferred upon Shreejit Gautam for outstanding idea under "Agriculture and Technology" in MBMC IdeaX 2024.',
      },
      {
        src: '/events/mbmc-ideax-2024-moments.jpg',
        title: 'Live Pitch & Event Highlights',
        label: 'Pitch & Highlights',
        caption: 'Presenting live to the jury, receiving the certificate from dignitaries, and milestone celebration with the team.',
      },
    ],
  },
  {
    id: 'open-data-week-2024',
    number: '02',
    category: 'Runner-Up · Datathon',
    badge: 'Third Runner-Up · Datathon',
    badgeType: 'winner',
    theme: 'Open Data & Civic Innovation',
    title: 'Open Data Week 2024',
    subtitle: 'Open Datathon · Third Runner-Up',
    organizer: 'Open Data Nepal & Community Partners',
    dates: 'March 1 – 7, 2024',
    location: 'Kathmandu, Nepal',
    team: 'Team TechBug',
    prize: 'Third Runner-Up · Certificate of Recognition',
    description:
      'Secured Third Runner-Up in the Open Data Week 2024 Datathon competing as "Team TechBug". Collaborated with teammates to process, analyze, and extract actionable insights from public civic and governance datasets, building a data-driven prototype presented live to data analysts, domain experts, and the evaluation jury.',
    highlights: [
      'Engineered data analytics and visualization workflows from open public datasets with Team TechBug.',
      'Clinched Third Runner-Up among competitive data science and developer teams.',
      'Presented findings and live analytical insights before the open data evaluation jury.',
    ],
    photos: [
      {
        src: '/events/open-data-week-ceremony.jpg',
        title: 'Stage Award & Certificate Ceremony',
        label: 'Ceremony & Certificates',
        caption: 'Team TechBug on stage receiving their certificates and awards at the Open Data Week 2024 Datathon.',
      },
      {
        src: '/events/open-data-week-team.jpg',
        title: 'Team TechBug at Open Data Week',
        label: 'Team TechBug',
        caption: 'Team TechBug (Sanjay Malla, Sudarshan Pokhrel, Subhindra Budhathoki, Shreejit Gautam) at the datathon.',
      },
    ],
  },
  {
    id: 'nasa-spaceapps-2024',
    number: '03',
    category: 'NASA Hackathon',
    badge: 'NASA Space Apps · 36-Hr Hackathon',
    badgeType: 'hackathon',
    theme: 'Space Science & Planetary Problem Solving',
    title: 'NASA Space Apps 2024',
    subtitle: 'International Space Apps Challenge · Kathmandu',
    organizer: 'Nepal Research and Collaboration Center (NRCC) & NASA',
    dates: 'October 5 – 6, 2024',
    location: 'Kathmandu, Nepal',
    team: '3-Member Collaborative Team',
    prize: '36-Hr Residential Sprint · Certificate of Participation',
    description:
      'Participated in the intensive 36-hour residential NASA International Space Apps Challenge 2024 (Kathmandu lead, hosted by NRCC). Collaborated with a multidisciplinary team to rapidly build and present an innovative software prototype leveraging NASA open satellite, planetary science, and Earth observation datasets to solve real-world global challenges.',
    highlights: [
      'Engineered a working prototype within 36 hours of continuous, residential sprint development.',
      'Leveraged open NASA satellite, Earth observation, and space exploration datasets.',
      'Conferred the official Certificate of Participation by NRCC and NASA Space Apps Kathmandu leads.',
    ],
    photos: [
      {
        src: '/events/nasa-spaceapps-team.jpg',
        title: 'Team Photo at NASA Space Apps Kathmandu',
        label: 'Photo Wall & Team',
        caption: 'Standing before the official NASA International Space Apps Challenge Kathmandu photo wall with teammates.',
      },
      {
        src: '/events/nasa-spaceapps-certificate.jpg',
        title: 'Certificate of Participation',
        label: 'Official Certificate',
        caption: 'Presented to Shreejit Gautam by NRCC for completing the 36-hour residential NASA Space Apps hackathon.',
      },
      {
        src: '/events/nasa-spaceapps-stage.jpg',
        title: 'Award & Recognition Ceremony',
        label: 'Stage Ceremony',
        caption: 'Receiving recognition and participation certificates from local leads and organizers on stage.',
      },
    ],
  },
]

function Events() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)
  const scrollTrackRef = useRef(null)

  const scrollToSlide = (index) => {
    const track = scrollTrackRef.current
    if (!track) return
    const targetIndex = Math.max(0, Math.min(index, eventsData.length - 1))
    const slides = track.querySelectorAll('.events-slide')
    if (slides[targetIndex]) {
      const targetLeft = slides[targetIndex].offsetLeft
      track.scrollTo({ left: targetLeft, behavior: 'smooth' })
      setActiveSlide(targetIndex)
    }
  }

  useEffect(() => {
    const track = scrollTrackRef.current
    if (!track) return undefined

    let timeoutId = null
    const handleScroll = () => {
      if (timeoutId) cancelAnimationFrame(timeoutId)
      timeoutId = requestAnimationFrame(() => {
        const slides = track.querySelectorAll('.events-slide')
        if (!slides.length) return
        const trackRect = track.getBoundingClientRect()
        let closestIdx = 0
        let minDistance = Infinity

        slides.forEach((slide, idx) => {
          const slideRect = slide.getBoundingClientRect()
          const distance = Math.abs(slideRect.left - trackRect.left)
          if (distance < minDistance) {
            minDistance = distance
            closestIdx = idx
          }
        })

        setActiveSlide(closestIdx)
      })
    }

    // Drag-to-scroll support for desktop & mouse users
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e) => {
      if (e.button !== 0) return
      if (
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.event-card-circle-btn')
      )
        return
      isDown = true
      startX = e.pageX - track.offsetLeft
      scrollLeft = track.scrollLeft
      track.classList.add('is-dragging')
    }

    const handleMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX) * 1.35
      track.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      if (!isDown) return
      isDown = false
      track.classList.remove('is-dragging')
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    track.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      track.removeEventListener('scroll', handleScroll)
      track.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      if (timeoutId) cancelAnimationFrame(timeoutId)
    }
  }, [])

  // Lock body scroll and handle Escape key when detail popup is active
  useEffect(() => {
    if (!selectedEvent) return undefined

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null)
      } else if (e.key === 'ArrowRight') {
        setModalPhotoIndex((prev) => (prev + 1) % selectedEvent.photos.length)
      } else if (e.key === 'ArrowLeft') {
        setModalPhotoIndex(
          (prev) => (prev - 1 + selectedEvent.photos.length) % selectedEvent.photos.length
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedEvent])

  const openEventDetails = (event) => {
    setSelectedEvent(event)
    setModalPhotoIndex(0)
  }

  return (
    <section id="events" className="content-section events-section" aria-labelledby="events-heading">
      <div className="events-header">
        <div>
          <p className="eyebrow light">
            <span>04</span> / EVENTS & ACHIEVEMENTS
          </p>
          <h2 id="events-heading">
            EVENTS &<br />
            <em>MILESTONES.</em>
          </h2>
        </div>

        <div className="events-header-nav">
          <div className="events-slide-pills" role="tablist" aria-label="Event slides">
            {eventsData.map((ev, idx) => (
              <button
                key={ev.id}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                className={`events-slide-pill ${activeSlide === idx ? 'is-active' : ''}`}
                onClick={() => scrollToSlide(idx)}
              >
                <span className="pill-number">{ev.number}</span>
                <span className="pill-title">{ev.title}</span>
                {ev.badgeType === 'winner' && <span className="pill-star">★</span>}
              </button>
            ))}
          </div>

          <div className="events-slider-actions">
            <span className="events-slider-counter">
              <strong>0{activeSlide + 1}</strong> / 0{eventsData.length}
            </span>
            <div className="events-slider-arrows">
              <button
                type="button"
                className="events-slider-btn prev"
                onClick={() => scrollToSlide(activeSlide - 1)}
                disabled={activeSlide === 0}
                aria-label="Previous event slide"
              >
                <ChevronLeft size={19} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                className="events-slider-btn next"
                onClick={() => scrollToSlide(activeSlide + 1)}
                disabled={activeSlide === eventsData.length - 1}
                aria-label="Next event slide"
              >
                <ChevronRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="events-track-wrapper">
        <div
          ref={scrollTrackRef}
          className="events-track"
          tabIndex={0}
          role="region"
          aria-label="Events sideways scrollable card carousel"
        >
          {eventsData.map((event, eventIndex) => (
            <div key={event.id} className="events-slide" data-index={eventIndex}>
              <article
                className="event-image-card"
                onClick={() => openEventDetails(event)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${event.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openEventDetails(event)
                  }
                }}
              >
                <img
                  src={event.photos[0].src}
                  alt={event.title}
                  className="event-card-bg-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="event-card-base-gradient" />
                <div className="event-card-theme-overlay" />

                <div className="event-card-topbar">
                  <span className="event-card-badge">{event.category}</span>
                  <span className="event-card-circle-btn" aria-label="Open event details">
                    <ArrowUpRight size={18} strokeWidth={2.4} />
                  </span>
                </div>

                <div className="event-card-bottom-info">
                  <div className="event-card-date">
                    <Calendar size={13} strokeWidth={2} />
                    <span>{event.dates}</span>
                  </div>
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-subtitle">{event.subtitle}</p>
                  <div className="event-card-meta-row">
                    <span className="event-card-prize-badge">
                      <Award size={13} strokeWidth={2} />
                      {event.prize.split(' & ')[0]}
                    </span>
                    <span className="event-card-photos-count">
                      <Maximize2 size={12} strokeWidth={2} /> {event.photos.length} Photos
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="events-slider-bottom">
          <div className="events-slider-hint">
            <span>← SCROLL OR DRAG SIDEWAYS TO EXPLORE →</span>
          </div>
          <div className="events-slider-dots">
            {eventsData.map((ev, i) => (
              <button
                key={ev.id}
                type="button"
                className={`events-dot ${activeSlide === i ? 'is-active' : ''}`}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to event slide ${i + 1}: ${ev.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          className="event-modal-backdrop"
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedEvent.title} Full Details`}
        >
          <div className="event-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <div className="event-modal-badge-group">
                <span className="event-modal-num">{selectedEvent.number}</span>
                <span className="event-modal-category">{selectedEvent.category}</span>
              </div>
              <button
                type="button"
                className="event-modal-close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={2.2} />
              </button>
            </div>

            <div className="event-modal-gallery">
              <div className="event-modal-main-img-wrap">
                <img
                  src={selectedEvent.photos[modalPhotoIndex].src}
                  alt={selectedEvent.photos[modalPhotoIndex].title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="event-modal-img-caption">
                  <strong>{selectedEvent.photos[modalPhotoIndex].title}</strong>
                  <p>{selectedEvent.photos[modalPhotoIndex].caption}</p>
                </div>
              </div>

              <div className="event-modal-thumbnails">
                {selectedEvent.photos.map((photo, pIdx) => (
                  <button
                    key={photo.src}
                    type="button"
                    className={`event-modal-thumb ${modalPhotoIndex === pIdx ? 'is-active' : ''}`}
                    onClick={() => setModalPhotoIndex(pIdx)}
                  >
                    <img src={photo.src} alt={photo.label} loading="lazy" decoding="async" />
                    <span>{photo.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="event-modal-body">
              <h3 className="event-modal-title">{selectedEvent.title}</h3>
              <p className="event-modal-subtitle">{selectedEvent.subtitle}</p>
              <p className="event-modal-organizer">{selectedEvent.organizer}</p>

              <div className="event-modal-chips">
                <span className="event-modal-chip">
                  <Calendar size={13} strokeWidth={1.8} />
                  {selectedEvent.dates}
                </span>
                <span className="event-modal-chip">
                  <MapPin size={13} strokeWidth={1.8} />
                  {selectedEvent.location}
                </span>
                <span className="event-modal-chip">
                  <Users size={13} strokeWidth={1.8} />
                  {selectedEvent.team}
                </span>
                <span className="event-modal-chip highlight">
                  <Award size={13} strokeWidth={1.8} />
                  {selectedEvent.prize}
                </span>
              </div>

              <div className="event-modal-description">
                <p>{selectedEvent.description}</p>
              </div>

              <div className="event-modal-highlights">
                <h4>Key Highlights</h4>
                {selectedEvent.highlights.map((point, i) => (
                  <div key={i} className="event-modal-highlight-item">
                    <CheckCircle2 size={16} strokeWidth={2} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="content-section experience-section">
      <div><p className="eyebrow"><span>03</span> / EXPERIENCE</p><h2>ALWAYS<br /><em>IN PROGRESS.</em></h2></div>
      <div className="experience-content"><p>Driven by curiosity. Grounded in building. Here are a few of the areas I love working in.</p>
        {['Artificial intelligence & machine learning', 'Backend systems & development', 'Computer vision & generative AI'].map((item, index) => <div className="experience-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={20} /></div>)}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="content-section contact-section">
      <div className="contact-top"><p className="eyebrow light"><span>05</span> / GET IN TOUCH</p><span>HAVE AN IDEA? LET’S MAKE IT REAL.</span></div>
      <h2>LET’S MAKE<br /><em>SOMETHING</em><br />MATTER<span>.</span></h2>
      <div className="contact-bottom"><p>Good work starts with a conversation.<br />Find me online and say hello.</p></div>
      <footer><span>© 2026 SHREEJIT GAUTAM</span><div>{socialLinks.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={17} /></a>)}</div><a href="#home">BACK TO TOP ↑</a></footer>
    </section>
  )
}

const CRITICAL_PRELOAD_ASSETS = [
  '/figma-hero/portrait.png',
  '/figma-hero/portrait-echo.png',
  '/figma-hero/grain.png',
  '/figma-hero/hero-grid.svg',
  '/figma-hero/corner-arc.svg',
  '/events/mbmc-ideax-2024-stage.jpg',
  '/events/open-data-week-ceremony.jpg',
  '/events/nasa-spaceapps-team.jpg',
]

function IntroAnimation({ onComplete, reduceMotion }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      onComplete()
      setIsRemoved(true)
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Preload critical assets in parallel
    const preloadPromise = Promise.all(
      CRITICAL_PRELOAD_ASSETS.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image()
            img.onload = img.onerror = resolve
            img.src = src
          })
      )
    )

    // Smooth counter animation up to ~100%
    const startTime = performance.now()
    const duration = 750
    let rafId

    const updateProgress = (now) => {
      const elapsed = now - startTime
      const current = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(current)
      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }
    rafId = requestAnimationFrame(updateProgress)

    // Ensure intro displays for ~800ms before triggering curtain exit
    const minTimer = new Promise((resolve) => setTimeout(resolve, 800))

    Promise.all([preloadPromise, minTimer]).then(() => {
      setProgress(100)
      setIsExiting(true)

      // Curtain slides up; trigger smooth page reveal at ~1000ms
      setTimeout(() => {
        onComplete()
        document.body.style.overflow = originalOverflow
      }, 250)

      // Remove intro from DOM after curtain is completely gone
      setTimeout(() => {
        setIsRemoved(true)
      }, 750)
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.overflow = originalOverflow
    }
  }, [reduceMotion, onComplete])

  if (isRemoved || reduceMotion) return null

  return (
    <div
      className={`intro-curtain ${isExiting ? 'is-exiting' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="intro-content">
        <div className="intro-monogram">
          <span className="intro-monogram-s">S</span>
          <span className="intro-monogram-slash">/</span>
          <span className="intro-monogram-g">G</span>
        </div>

        <div className="intro-meta">
          <span className="intro-name">SHREEJIT GAUTAM</span>
          <span className="intro-tagline">PORTFOLIO / 2026</span>
        </div>

        <div className="intro-progress-bar">
          <div className="intro-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="intro-counter">
          <span>{progress}</span>
          <span className="intro-percent">%</span>
        </div>
      </div>
    </div>
  )
}

export default function App({ workSection, experienceSection } = {}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [introComplete, setIntroComplete] = useState(false)
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 })
    navigation.forEach(([, target]) => { const element = document.getElementById(target); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined
    const hero = heroRef.current
    const parallax = [...hero.querySelectorAll('[data-parallax]')]
    const move = (event) => {
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      parallax.forEach((element, index) => gsap.to(element, { x: x * (index + 1) * 9, y: y * (index + 1) * 9, duration: 1, ease: 'power3.out', overwrite: 'auto' }))
    }
    const reset = () => parallax.forEach((element) => gsap.to(element, { x: 0, y: 0, duration: 1, ease: 'power3.out' }))
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', reset)
    const magneticItems = [...document.querySelectorAll('[data-magnetic]')]
    const listeners = magneticItems.map((element) => {
      const onMove = (event) => {
        const rect = element.getBoundingClientRect()
        gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * 0.13, y: (event.clientY - rect.top - rect.height / 2) * 0.18, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
      }
      const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' })
      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', onLeave)
      return () => { element.removeEventListener('pointermove', onMove); element.removeEventListener('pointerleave', onLeave) }
    })
    return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset); listeners.forEach((cleanup) => cleanup()) }
  }, [reduceMotion])

  return (
    <>
      <IntroAnimation
        onComplete={() => setIntroComplete(true)}
        reduceMotion={reduceMotion}
      />
      <div className={`site-shell overflow-hidden ${introComplete ? 'is-revealed' : 'is-loading'}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <SocialRail />
        <main id="main">
          <Hero heroRef={heroRef} reduceMotion={reduceMotion} introComplete={introComplete} />
          {workSection || <Work />}
          {experienceSection || <Experience />}
          <Events />
          <Contact />
        </main>
      </div>
    </>
  )
}
