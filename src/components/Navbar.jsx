import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <svg viewBox="0 0 32 32" className="logo-icon">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#ff00ff" />
              </linearGradient>
            </defs>
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke="url(#logoGradient)" strokeWidth="2"/>
            <text x="16" y="20" textAnchor="middle" fill="url(#logoGradient)" fontFamily="monospace" fontSize="10" fontWeight="bold">MM</text>
          </svg>
          <span className="logo-text">markmarkdown</span>
        </a>
        
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#hero" className="nav-link">Inicio</a>
          <a href="#typing" className="nav-link">Mecanografia</a>
          <a href="#markdown" className="nav-link">Markdown</a>
          <a href="#roadmap" className="nav-link">Progreso</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar