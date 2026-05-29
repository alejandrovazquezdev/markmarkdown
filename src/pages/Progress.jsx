import { useEffect, useRef } from 'react'
import anime from 'animejs'

const progressData = {
  typing: {
    title: 'Mecanografia',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
      </svg>
    ),
    items: [
      { text: 'Postura y posicion de manos', completed: true },
      { text: 'Fila de inicio: asdf jkl', completed: true },
      { text: 'Fila superior: qwer uio', completed: false },
      { text: 'Fila inferior: zxcv m,.', completed: false },
      { text: 'Numeros y simbolos', completed: false },
      { text: 'Practica de velocidad', completed: false },
      { text: 'Precision y consistencia', completed: false }
    ],
    color: '#00f0ff'
  },
  markdown: {
    title: 'Markdown',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    color: '#ff00aa'
  }
}

function Progress() {
  const containerRef = useRef(null)

  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.progress-card',
      opacity: [0, 1],
      translateY: [40, 0],
      delay: anime.stagger(150),
      duration: 600,
      easing: 'easeOutExpo'
    })
  }, [])

  const calculateProgress = (items) => {
    const completed = items.filter(i => i.completed).length
    return Math.round((completed / items.length) * 100)
  }

  const totalItems = progressData.typing.items.length + progressData.markdown.items.length
  const completedItems = 
    progressData.typing.items.filter(i => i.completed).length +
    progressData.markdown.items.filter(i => i.completed).length
  const totalProgress = Math.round((completedItems / totalItems) * 100)

  return (
    <div className="page progress-page" ref={containerRef}>
      <div className="page-header">
        <h1>Tu Progreso</h1>
        <p>Trackea tu aprendizaje en mecanografia y markdown</p>
      </div>

      <div className="overall-progress">
        <div className="progress-ring-container">
          <svg className="progress-ring" viewBox="0 0 120 120">
            <circle
              className="progress-ring-bg"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className="progress-ring-fill"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${totalProgress * 3.39} 339`}
              strokeLinecap="round"
            />
          </svg>
          <div className="progress-ring-text">
            <span className="progress-percent">{totalProgress}%</span>
            <span className="progress-label">Completado</span>
          </div>
        </div>
        <div className="overall-stats">
          <div className="overall-stat">
            <span className="stat-number">{completedItems}</span>
            <span className="stat-desc">Tareas completadas</span>
          </div>
          <div className="overall-stat">
            <span className="stat-number">{totalItems - completedItems}</span>
            <span className="stat-desc">Tareas pendientes</span>
          </div>
        </div>
      </div>

      <div className="progress-cards">
        {Object.entries(progressData).map(([key, section]) => (
          <div key={key} className="progress-card" style={{ '--accent': section.color }}>
            <div className="card-header">
              <div className="card-icon">
                {section.icon}
              </div>
              <div className="card-title">
                <h3>{section.title}</h3>
                <span className="card-progress">{calculateProgress(section.items)}%</span>
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill"
                  style={{ 
                    width: `${calculateProgress(section.items)}%`,
                    background: `linear-gradient(90deg, ${section.color}, ${section.color}88)`
                  }}
                />
              </div>
            </div>

            <ul className="progress-items">
              {section.items.map((item, i) => (
                <li key={i} className={`progress-item ${item.completed ? 'completed' : ''}`}>
                  <span className="item-check">
                    {item.completed ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    ) : (
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    )}
                  </span>
                  <span className="item-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Progress