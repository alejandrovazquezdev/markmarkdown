import { useState, useEffect } from 'react'

function Navbar({ lang, onToggleLang }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <svg viewBox="0 0 32 32" className="logo-icon" fill="none">
            <rect x="2" y="6" width="28" height="20" rx="2" stroke="#00ff9d" strokeWidth="1.5"/>
            <path d="M10 12L6 16L10 20" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 12L26 16L22 20" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 10L15 22" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="logo-text">
            markmarkdown
            <span className="cursor"></span>
          </span>
        </a>

        <div className="nav-info">
          <span className="nav-label">// curriculum</span>
          <button className="lang-toggle" onClick={onToggleLang}>
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
