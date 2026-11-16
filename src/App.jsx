import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import {
  ArrowDown, ArrowUpRight, BrainCircuit, Code2, Github, Instagram,
  Linkedin, Menu, ScanEye, Sparkles, X,
} from 'lucide-react'

const navigation = [
  ['Home', 'home'],
  ['Work', 'work'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Contact', 'contact'],
]

const socialLinks = [
  { label: 'GitHub profile', href: 'https://github.com/Shreejit-gautam', Icon: Github },
  { label: 'Search for Shreejit Gautam on LinkedIn', href: 'https://www.linkedin.com/search/results/people/?keywords=Shreejit%20Gautam', Icon: Linkedin },
  { label: 'Search for Shreejit Gautam on Instagram', href: 'https://www.google.com/search?q=site%3Ainstagram.com+%22Shreejit+Gautam%22', Icon: Instagram },
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
    text: 'An open-source package for working with curved and circular text.',
    url: 'https://pypi.org/project/annular-text-rectifier/',
    visual: 'annular',
  },
  {
    number: '02',
    category: 'EXTRACTION / PYTHON',
    title: 'Dotcode\nExtracter',
    text: 'An open-source exploration in visual data extraction.',
    url: 'https://pypi.org/project/dotcode-extracter/',
    visual: 'dotcode',
  },
]

function MagneticLink({ children, className = '', href, ...props }) {
  return <a href={href} className={`magnetic ${className}`} data-magnetic {...props}>{children}</a>
}

function Header({ active, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <a className="monogram" href="#home" aria-label="Shreejit Gautam, back to home">
        <span>S</span><i>/</i><span>G</span>
      </a>
      <div className="header-rule" aria-hidden="true"><span>PORTFOLIO / 2026</span></div>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" id="main-navigation">
        {navigation.map(([name, target]) => (
          <a key={target} href={`#${target}`} className={active === target ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            {name}
          </a>
        ))}
      </nav>
      <MagneticLink className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={16} strokeWidth={1.8} /></MagneticLink>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
  )
}

function SocialRail() {
  return (
    <div className="social-rail">
      <span className="rail-line" />
      <div className="social-links">
        {socialLinks.map(({ label, href, Icon }) => (
          <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} key={label}><Icon size={17} strokeWidth={1.7} /></a>
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
      <div className="hero-grid" aria-hidden="true" />
      <div className="corner-arc" aria-hidden="true" />
      <SocialRail />

      <motion.div className="hero-topline" {...entrance(0.05)}>
        <span><b>01</b> / INTRO</span><span className="topline-rule" />
      </motion.div>
      <motion.div className="availability" {...entrance(0.3)}>
        <span className="availability-dot" /> INDEPENDENT CREATIVE DEVELOPER
      </motion.div>

      <div className="hero-art absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="art-disc" data-parallax="disc" />
        <div className="disc-outline" data-parallax="outline" />
        <div className="orbit orbit-one"><span /></div>
        <div className="orbit orbit-two"><span /></div>
        <div className="orbit-cross">+</div>
        <div className="art-sphere" data-parallax="sphere" />
        <div className="art-dots" />
        <div className="art-index">FIG. 01 <span>—</span> CREATIVE IN MOTION</div>
      </div>

      <motion.div className="name-block" {...entrance(0.12, 38)}>
        <h1 id="hero-title"><span>SHREEJIT</span><span>GAUTAM<span className="name-period">.</span></span></h1>
        <svg className="name-swoosh" viewBox="0 0 370 90" fill="none" aria-hidden="true">
          <path d="M5 77C95 42 224 5 273 14c37 7-20 30-31 39-20 16 51-7 116-27" />
        </svg>
      </motion.div>

      <motion.div className="portrait-wrap" {...entrance(0.18, 35)}>
        <div className="portrait-shadow" />
        <img className="portrait" src="/shreejit-profile.png" alt="Shreejit Gautam wearing a burgundy shirt" />
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
        <div className="side-stat"><strong>10K<span>+</span></strong><p>Concurrent<br />users handled</p></div>
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
      <div className="about-left"><p className="eyebrow light"><span>03</span> / ABOUT</p><h2>CURIOUS<br />BY <em>DESIGN.</em></h2><div className="about-mark">S<span>/</span>G</div></div>
      <div className="about-right"><p className="about-lead">A creative mind with a developer’s toolkit.</p><p>I’m Shreejit — a developer, designer, and creator interested in the space where thoughtful ideas and useful technology come together.</p><p>From intelligent systems to expressive digital experiences, I like making things that feel as good as they work.</p><a href="#contact" className="text-link">A LITTLE MORE CONVERSATION <ArrowUpRight size={17} /></a></div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="content-section experience-section">
      <div><p className="eyebrow"><span>04</span> / EXPERIENCE</p><h2>ALWAYS<br /><em>IN PROGRESS.</em></h2></div>
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
      <div className="contact-bottom"><p>Good work starts with a conversation.<br />Find me online and say hello.</p><MagneticLink className="button contact-button" href="https://www.linkedin.com/search/results/people/?keywords=Shreejit%20Gautam" target="_blank" rel="noreferrer">Find me on LinkedIn <ArrowUpRight size={19} /></MagneticLink></div>
      <footer><span>© 2026 SHREEJIT GAUTAM</span><div>{socialLinks.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={17} /></a>)}</div><a href="#home">BACK TO TOP ↑</a></footer>
    </section>
  )
}

export default function App() {
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
      <main id="main"><Hero heroRef={heroRef} reduceMotion={reduceMotion} /><Work /><About /><Experience /><Contact /></main>
    </div>
  )
}
