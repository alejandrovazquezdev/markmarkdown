import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

const vimLessons = [
  {
    id: 1,
    title: 'Modos de Vim',
    description: 'Aprende los tres modos fundamentales',
    content: [
      { key: 'Esc', action: 'Salir al modo Normal' },
      { key: 'i', action: 'Entrar al modo Insertar' },
      { key: 'v', action: 'Entrar al modo Visual' },
      { key: ':', action: 'Entrar al modo Comando' }
    ],
    exercise: 'Presiona i para insertar, escribe algo, presiona Esc para salir'
  },
  {
    id: 2,
    title: 'Movimiento Basico',
    description: 'Navega sin el mouse',
    content: [
      { key: 'h', action: 'Mover a la izquierda' },
      { key: 'j', action: 'Mover hacia abajo' },
      { key: 'k', action: 'Mover hacia arriba' },
      { key: 'l', action: 'Mover a la derecha' }
    ],
    exercise: 'Usa hjkl para moverte por este texto'
  },
  {
    id: 3,
    title: 'Edicion Rapida',
    description: 'Edita texto eficientemente',
    content: [
      { key: 'x', action: 'Eliminar caracter actual' },
      { key: 'dd', action: 'Eliminar linea completa' },
      { key: 'yy', action: 'Copiar linea' },
      { key: 'p', action: 'Pegar despues' }
    ],
    exercise: 'Copia una linea con yy y pegala con p'
  },
  {
    id: 4,
    title: 'Busqueda',
    description: 'Encuentra texto rapidamente',
    content: [
      { key: '/', action: 'Buscar hacia adelante' },
      { key: 'n', action: 'Siguiente coincidencia' },
      { key: 'N', action: 'Coincidencia anterior' },
      { key: ':noh', action: 'Limpiar busqueda' }
    ],
    exercise: 'Presiona / y busca una palabra'
  }
]

const vimCommands = [
  { cmd: ':w', desc: 'Guardar archivo' },
  { cmd: ':q', desc: 'Salir' },
  { cmd: ':wq', desc: 'Guardar y salir' },
  { cmd: ':q!', desc: 'Salir sin guardar' },
  { cmd: 'u', desc: 'Deshacer' },
  { cmd: 'Ctrl+r', desc: 'Rehacer' }
]

function VimPractice() {
  const [activeLesson, setActiveLesson] = useState(1)
  const [userInput, setUserInput] = useState('')
  const [correctKeys, setCorrectKeys] = useState([])
  const [showCommand, setShowCommand] = useState(false)
  const containerRef = useRef(null)

  const currentLesson = vimLessons.find(l => l.id === activeLesson)

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutExpo'
      })
    }
  }, [activeLesson])

  const handleKeyPress = (e) => {
    const expectedKey = currentLesson?.content[correctKeys.length]?.key
    if (e.key === expectedKey || e.key === expectedKey?.toLowerCase()) {
      setCorrectKeys(prev => [...prev, expectedKey])
      if (correctKeys.length + 1 === currentLesson?.content.length) {
        setShowCommand(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [correctKeys, currentLesson])

  return (
    <div className="vim-practice" ref={containerRef}>
      <div className="section-header">
        <h2> Practica Vim</h2>
        <p>Domina los atajos de teclado mas eficientes</p>
      </div>

      <div className="vim-layout">
        <div className="vim-keys-grid">
          {vimLessons.map(lesson => (
            <button
              key={lesson.id}
              className={`vim-lesson-card ${activeLesson === lesson.id ? 'active' : ''}`}
              onClick={() => {
                setActiveLesson(lesson.id)
                setCorrectKeys([])
                setShowCommand(false)
              }}
            >
              <span className="lesson-number">{String(lesson.id).padStart(2, '0')}</span>
              <span className="lesson-title">{lesson.title}</span>
            </button>
          ))}
        </div>

        <div className="vim-terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="terminal-title">vim-practice</span>
          </div>
          
          <div className="terminal-content">
            <div className="lesson-display">
              <h3>{currentLesson?.title}</h3>
              <p>{currentLesson?.description}</p>
              
              <div className="keys-mapping">
                {currentLesson?.content.map((item, idx) => (
                  <div key={idx} className={`key-map ${correctKeys.includes(item.key) ? 'completed' : ''}`}>
                    <kbd>{item.key}</kbd>
                    <span>{item.action}</span>
                  </div>
                ))}
              </div>

              {showCommand && (
                <div className="exercise-prompt">
                  <p>{currentLesson?.exercise}</p>
                  <div className="command-hints">
                    {vimCommands.map((cmd, i) => (
                      <span key={i} className="cmd-hint">{cmd.cmd}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VimPractice