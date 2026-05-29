import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
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
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Inicio</Link>
          <Link to="/typing" className={`nav-link ${isActive('/typing')}`}>Mecanografia</Link>
          <Link to="/markdown" className={`nav-link ${isActive('/markdown')}`}>Markdown</Link>
          <Link to="/progress" className={`nav-link ${isActive('/progress')}`}>Progreso</Link>
        </div>

        <button className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar