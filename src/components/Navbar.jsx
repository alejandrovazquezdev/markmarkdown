import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <svg viewBox="0 0 32 32" className="logo-icon">
            <polygon 
              points="16,3 28,10 28,22 16,29 4,22 4,10" 
              fill="none" 
              stroke="#00f0ff" 
              strokeWidth="1.5"
            />
            <path 
              d="M10 20 L14 16 L18 18 L22 12" 
              fill="none" 
              stroke="#ff00aa" 
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="logo-text">markmarkdown</span>
        </a>

        <div className="nav-info">
          <span className="nav-label">Curriculum Unificado</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar