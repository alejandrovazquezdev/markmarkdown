import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene3D from './components/Scene3D'
import TypingPractice from './components/TypingPractice'
import MarkdownPractice from './components/MarkdownPractice'
import Roadmap from './components/Roadmap'
import Navbar from './components/Navbar'
import './styles/App.css'

function GlitchText({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setIsGlitching(true), 2000)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    if (isGlitching) {
      const interval = setInterval(() => {
        setDisplayText(() => {
          const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
          return text.split('').map(char => 
            Math.random() > 0.9 
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          ).join('')
        })
        setTimeout(() => setDisplayText(text), 50)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isGlitching, text])

  return <span className="glitch-text">{displayText}</span>
}

function TypewriterText({ texts, speed = 50 }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    if (!isDeleting && currentText.length < currentFullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentFullText.slice(0, currentText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentText.length > 0) {
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1))
      }, speed / 2)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentText.length === currentFullText.length) {
      setTimeout(() => setIsDeleting(true), 2500)
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }
  }, [currentText, isDeleting, currentTextIndex, texts, speed])

  return (
    <span className="typewriter">
      {currentText}
      <span className="cursor">|</span>
    </span>
  )
}

function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    import('animejs').then(({ default: anime }) => {
      const timeline = anime.timeline({ easing: 'easeOutExpo' })
      timeline
        .add({
          targets: '.hero-subtitle',
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1500,
          delay: 500
        })
        .add({
          targets: '.hero-cta',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 1000
        }, '-=500')
    })
  }, [])

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title">
          <GlitchText text="markmarkdown" />
        </h1>
        <p className="hero-subtitle">
          <TypewriterText 
            texts={[
              'Domina la mecanografia con precision',
              'Aprende markdown de forma interactiva',
              'Escribe mas rapido, escribe mejor'
            ]} 
          />
        </p>
        <div className="hero-cta">
          <a href="#typing" className="cta-button primary">
            <span>Comenzar</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#roadmap" className="cta-button secondary">
            <span>Ver Progreso</span>
          </a>
        </div>
      </div>
      <div className="hero-decoration">
        <div className="deco-ring ring-1"></div>
        <div className="deco-ring ring-2"></div>
        <div className="deco-ring ring-3"></div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app">
      <Canvas className="bg-canvas" camera={{ position: [0, 0, 30], fov: 60 }}>
        <Scene3D />
      </Canvas>
      <Navbar />
      <main className="main-content">
        <Hero />
        <Roadmap />
        <div id="practices" className="practices-container">
          <section id="typing" className="practice-section">
            <TypingPractice />
          </section>
          <section id="markdown" className="practice-section">
            <MarkdownPractice />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App