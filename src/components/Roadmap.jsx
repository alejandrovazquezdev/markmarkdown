import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

const roadmapSections = [
  {
    id: 'typing',
    title: 'MECANOGRAFIA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
      </svg>
    ),
    items: [
      { text: 'Postura y posicion de manos', completed: true },
      { text: 'Fila inicio: asdf jkl', completed: true },
      { text: 'Fila superior: qwer uio', completed: false },
      { text: 'Fila inferior: zxcv m,.', completed: false },
      { text: 'Numeros y simbolos', completed: false },
      { text: 'Practica de velocidad', completed: false },
      { text: 'Precision y consistencia', completed: false }
    ],
    color: '#00ffff'
  },
  {
    id: 'markdown',
    title: 'MARKDOWN',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M7 15V9l3 3 3-3v6"/>
        <path d="M7 7.5L4.5 9l2.5 1.5"/>
      </svg>
    ),
    items: [
      { text: 'Encabezados', completed: true },
      { text: 'Formato de texto', completed: true },
      { text: 'Enlaces e imagenes', completed: false },
      { text: 'Listas', completed: false },
      { text: 'Tablas', completed: false },
      { text: 'Codigo inline y bloques', completed: false },
      { text: 'Extensiones GFM', completed: false }
    ],
    color: '#ff00ff'
  }
]

function ProgressBar({ progress, color }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ 
        width: `${progress}%`, 
        background: `linear-gradient(90deg, ${color}, ${color}88)`
      }}></div>
    </div>
  )
}

function Roadmap() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: '.roadmap-card',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(150),
        duration: 800,
        easing: 'easeOutExpo'
      })
    }
  }, [])

  const calculateProgress = (items) => {
    return Math.round((items.filter(i => i.completed).length / items.length) * 100)
  }

  return (
    <section id="roadmap" className="roadmap">
      <div className="roadmap-header">
        <h2>Tu Progreso</h2>
        <p>Rastrea tu aprendizaje en mecanografia y markdown</p>
      </div>
      
      <div className="roadmap-grid" ref={containerRef}>
        {roadmapSections.map((section) => (
          <div
            key={section.id}
            className={`roadmap-card ${hoveredCard === section.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(section.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ '--accent': section.color }}
          >
            <div className="card-header">
              <div className="card-icon">
                {section.icon}
              </div>
              <h3>{section.title}</h3>
            </div>
            
            <div className="card-progress">
              <span className="progress-label">Progreso</span>
              <ProgressBar progress={calculateProgress(section.items)} color={section.color} />
              <span className="progress-value">{calculateProgress(section.items)}%</span>
            </div>
            
            <ul className="card-items">
              {section.items.map((item, i) => (
                <li key={i} className={item.completed ? 'completed' : ''}>
                  <span className="item-indicator">
                    {item.completed ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    ) : (
                      <span className="item-number">{String(i + 1).padStart(2, '0')}</span>
                    )}
                  </span>
                  <span className="item-text">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <a href={`#${section.id}`} className="card-action">
              <span>Practicar</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Roadmap