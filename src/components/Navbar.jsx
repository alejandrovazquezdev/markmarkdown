function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <svg viewBox="0 0 24 24" className="logo-icon">
          <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.38 3.7L12 12.72l-7.38-4.84L12 4.18zM4 8.27l7 3.5v7.46l-7-3.5V8.27zm9 10.96v-7.46l7-3.5v7.46l-7 3.5z"/>
        </svg>
        <span>markmarkdown</span>
      </div>
      <div className="nav-links">
        <a href="#roadmap">Roadmap</a>
        <a href="#typing">Typing</a>
        <a href="#markdown">Markdown</a>
      </div>
    </nav>
  )
}

export default Navbar