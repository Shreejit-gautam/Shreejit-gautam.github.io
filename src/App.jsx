import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import {
  ArrowDown, ArrowUpRight, BrainCircuit, Code2, Download, Github, Instagram,
  Linkedin, Mail, Menu, ScanEye, Sparkles, X,
} from 'lucide-react'

const navigation = [
  ['Home', 'home'],
  ['Work', 'work'],
  ['Experience', 'experience'],
  ['About', 'about'],
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

export function Header({ active, menuOpen, setMenuOpen }) {
  const [visible, setVisible] = useState(true)
  const [darkBackground, setDarkBackground] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    let previousY = window.scrollY
    const updateHeader = () => {
      const currentY = window.scrollY
      const section = [...document.querySelectorAll('main > section')].find(element => {
        const rect = element.getBoundingClientRect()
        return rect.top <= 36 && rect.bottom > 36
      })
      setDarkBackground(section?.id === 'work' || section?.id === 'contact')
      if (currentY < 10) { setVisible(true); previousY = currentY }
      else if (Math.abs(currentY - previousY) >= 4) {
        if (currentY < previousY) setVisible(true)
        else if (!menuOpen && !headerRef.current?.contains(document.activeElement)) setVisible(false)
        previousY = currentY
      }
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [menuOpen])

  return (
    <header ref={headerRef} className={`site-header ${active === 'home' ? 'is-hero' : ''} ${darkBackground ? 'is-dark' : ''} ${visible ? '' : 'is-hidden'}`} inert={!visible}>
      <a className="monogram" href="#home" aria-label="Shreejit Gautam, back to home">
        <span>S</span><i>/</i><span>G</span>
      </a>
      <div className="header-rule" aria-hidden="true"><span>PORTFOLIO / 2026</span></div>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" id="main-navigation">
        {navigation.map(([name, target]) => (
          <a key={target} href={`#${target}`} className={active === target.replace('/', '') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            {name}
          </a>
        ))}
      </nav>
      {active === 'home'
        ? <a className="header-cta" href="/shreejit-gautam-cv.pdf" target="_blank" rel="noreferrer"><Download size={16} strokeWidth={2} /> Resume</a>
        : <MagneticLink className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={16} strokeWidth={2} /></MagneticLink>}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
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
        return section?.id === 'work' || section?.id === 'contact'
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

function Hero({ heroRef, reduceMotion }) {
  const entrance = (delay = 0, y = 24) => reduceMotion ? {} : {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }
  return (
    <section className="hero" id="home" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true">
        <img src="/figma-hero/hero-grid.svg" alt="" className="hero-grid-svg" />
      </div>
      <div className="corner-arc" aria-hidden="true">
        <img src="/figma-hero/corner-arc.svg" alt="" />
      </div>

      <motion.div className="hero-topline" {...entrance(0.05)}>
        <span><b>Hi,</b> Iam</span>
      </motion.div>
      <motion.div className="availability" {...entrance(0.3)}>
        <span className="availability-dot" /> INDEPENDENT CREATIVE DEVELOPER
      </motion.div>

      <div className="hero-art absolute inset-0 pointer-events-none" aria-hidden="true">
        <img className="hero-fine-orbit" src="/figma-hero/fine-orbit.svg" alt="" />
        <img className="hero-lower-orbit" src="/figma-hero/lower-orbit.svg" alt="" />
        <div className="orbit-cross">+</div>
        <img className="art-sphere" src="/figma-hero/sphere-3d.svg" data-parallax="sphere" alt="" />
        <img className="art-dots" src="/figma-hero/dot-grid.svg" alt="" />
        <img className="art-index" src="/figma-hero/art-index.svg" alt="FIG. 01 — CREATIVE IN MOTION" />
        <div className="hero-ground-frame"><img className="hero-ground" src="/figma-hero/ground.svg" alt="" /></div>
      </div>

      <motion.div className="name-block" {...entrance(0.12, 38)}>
        <h1 id="hero-title" className="sr-only">SHREEJIT GAUTAM</h1>
        <div className="name-visual" aria-hidden="true">
          <img className="name-shreejit" src="/figma-hero/shreejit-title.svg" alt="SHREEJIT" />
          <div className="name-gautam-row">
            <img className="name-gautam" src="/figma-hero/gautam-title.svg" alt="GAUTAM" />
            <img className="name-swoosh" src="/figma-hero/swoosh.svg" alt="" />
          </div>
        </div>
      </motion.div>

      <div className="portrait-mask" aria-hidden="true">
        <img className="portrait-echo portrait-echo-far" src="/figma-hero/portrait-echo.png" alt="" />
        <img className="portrait-echo portrait-echo-near" src="/figma-hero/portrait-echo.png" alt="" />
      </div>
      <motion.div className="portrait-wrap" {...entrance(0.18, 35)}>
        <img className="portrait" src="/figma-hero/portrait.png" alt="Shreejit Gautam wearing a burgundy shirt" />
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

      <motion.div className="hero-side" {...entrance(0.55)}>
        <div className="side-label"><span /> <p>THINK<br />MAKE<br />CREATE<span className="side-period">.</span></p></div>
        <div className="side-stat"><strong>2<span>+</span></strong><p>Years of<br />experience</p></div>
        <div className="side-stat"><strong>5K<span>+</span></strong><p>Concurrent<br />users handled</p></div>
        <div className="side-stat"><strong>5<span>+</span></strong><p>Projects<br />delivered</p></div>
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

function About() {
  return (
    <section id="about" className="content-section about-section">
      <div className="about-left"><p className="eyebrow light"><span>04</span> / ABOUT</p><h2>CURIOUS<br />BY <em>DESIGN.</em></h2><div className="about-mark">S<span>/</span>G</div></div>
      <div className="about-right"><p className="about-lead">A creative mind with a developer’s toolkit.</p><p>I’m Shreejit — a developer, designer, and creator interested in the space where thoughtful ideas and useful technology come together.</p><p>From intelligent systems to expressive digital experiences, I like making things that feel as good as they work.</p><a href="#contact" className="text-link">A LITTLE MORE CONVERSATION <ArrowUpRight size={17} /></a></div>
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
      <div className="contact-bottom"><p>Good work starts with a conversation.<br />Find me online and say hello.</p><MagneticLink className="button contact-button" href="https://www.linkedin.com/in/shreejit-gautam-a84056437/" target="_blank" rel="noreferrer">Find me on LinkedIn <ArrowUpRight size={19} /></MagneticLink></div>
      <footer><span>© 2026 SHREEJIT GAUTAM</span><div>{socialLinks.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={17} /></a>)}</div><a href="#home">BACK TO TOP ↑</a></footer>
    </section>
  )
}

export default function App({ workSection, experienceSection } = {}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
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
    <div className="site-shell overflow-hidden">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SocialRail />
      <main id="main">
        <Hero heroRef={heroRef} reduceMotion={reduceMotion} />
        {workSection || <Work />}
        {experienceSection || <Experience />}
        <About />
        <Contact />
      </main>
    </div>
  )
}
