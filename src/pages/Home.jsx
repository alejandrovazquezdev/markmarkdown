import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import Scene3D from '../components/Scene3D'
import anime from 'animejs'

function Home() {
  const containerRef = useRef(null)

  useEffect(() => {
    anime({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1200,
      easing: 'easeOutExpo'
    })
    anime({
      targets: '.hero-text',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: 300,
      easing: 'easeOutExpo'
    })
    anime({
      targets: '.hero-cards',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: 600,
      easing: 'easeOutExpo'
    })
  }, [])

  return (
    <div className="page home-page">
      <Canvas className="bg-canvas" camera={{ position: [0, 0, 30], fov: 60 }}>
        <Scene3D />
      </Canvas>
      
      <div className="hero-container" ref={containerRef}>
        <h1 className="hero-title">
          <span className="title-main">markmarkdown</span>
        </h1>
        
        <div className="hero-text">
          <p className="hero-subtitle">Practica mecanografia y markdown</p>
          <p className="hero-description">Dos habilidades esenciales para developers. Sin distracciones, sin registro. Solo practica.</p>
        </div>

        <div className="hero-cards">
          <Link to="/typing" className="feature-card typing-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
              </svg>
            </div>
            <h3>Mecanografia</h3>
            <p>5 ejercicios progresivos</p>
            <span className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>

          <Link to="/markdown" className="feature-card markdown-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M7 15V9l3 3 3-3v6"/>
                <path d="M7 7.5L4.5 9l2.5 1.5"/>
              </svg>
            </div>
            <h3>Markdown</h3>
            <p>6 lecciones interactivas</p>
            <span className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-desc">Ejercicios</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-desc">Lecciones</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">0</span>
            <span className="stat-desc">Registro</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home