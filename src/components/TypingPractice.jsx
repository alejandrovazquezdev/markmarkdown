import { useState, useEffect, useRef, useCallback } from 'react'
import anime from 'animejs'

const typingExercises = [
  { 
    category: 'markdown-basico',
    title: 'Encabezados',
    lines: [
      '# Titulo Principal',
      '## Subtitulo',
      '### Seccion'
    ],
    wpm: 45,
    accuracy: 95
  },
  { 
    category: 'markdown-formato',
    title: 'Formato de Texto',
    lines: [
      '**texto en negrita**',
      '*texto en cursiva*',
      '~~texto tachado~~'
    ],
    wpm: 40,
    accuracy: 92
  },
  { 
    category: 'markdown-enlaces',
    title: 'Enlaces',
    lines: [
      '[texto del enlace](https://ejemplo.com)',
      '![alt](imagen.jpg)',
      '[referencia][ref]'
    ],
    wpm: 35,
    accuracy: 90
  },
  { 
    category: 'markdown-listas',
    title: 'Listas',
    lines: [
      '- Elemento uno',
      '- Elemento dos',
      '  - Sub elemento'
    ],
    wpm: 50,
    accuracy: 97
  },
  { 
    category: 'markdown-codigo',
    title: 'Bloques de Codigo',
    lines: [
      '```javascript',
      'const x = 1;',
      '```'
    ],
    wpm: 30,
    accuracy: 88
  },
  { 
    category: 'markdown-tablas',
    title: 'Tablas',
    lines: [
      '| Column1 | Column2 |',
      '|--------|--------|',
      '| value  | value  |'
    ],
    wpm: 25,
    accuracy: 85
  }
]

function StatDisplay({ value, label, color }) {
  return (
    <div className="stat-display" style={{ '--stat-color': color }}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function TypingDisplay({ text, currentIndex }) {
  return (
    <div className="typing-display">
      {text.split('').map((char, i) => {
        let className = 'char'
        if (i < currentIndex) className += ' correct'
        else if (i === currentIndex) className += ' current'
        else if (char === ' ') className += ' space'
        
        return (
          <span key={i} className={className}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </div>
  )
}

function TypingPractice() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState(0)
  const containerRef = useRef(null)

  const exercise = typingExercises[currentExercise]
  const currentLine = exercise.lines[currentLineIndex]

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutExpo'
      })
    }
  }, [currentExercise])

  const handleInput = useCallback((e) => {
    const value = e.target.value
    
    if (!startTime) setStartTime(Date.now())
    
    if (value.length > currentLine.length) return
    
    setUserInput(value)
    setCurrentIndex(value.length)
    
    if (value !== currentLine.substring(0, value.length)) {
      setErrors(prev => prev + 1)
      anime({
        targets: '.typing-display',
        filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
        duration: 100
      })
    }
    
    const elapsed = (Date.now() - startTime) / 1000 / 60
    const words = value.split(' ').length
    if (elapsed > 0) setWpm(Math.round(words / elapsed))
    
    const correctChars = value.split('').filter((c, i) => c === currentLine[i]).length
    setAccuracy(Math.round((correctChars / value.length) * 100) || 100)
    
    if (value === currentLine) {
      if (currentLineIndex < exercise.lines.length - 1) {
        setCurrentLineIndex(prev => prev + 1)
        setUserInput('')
        setCurrentIndex(0)
      } else {
        setCompleted(true)
        anime({
          targets: containerRef.current,
          scale: [1, 1.02, 1],
          duration: 500,
          easing: 'easeOutElastic(1, .5)'
        })
      }
    }
  }, [currentLine, currentLineIndex, exercise.lines.length, startTime])

  const nextExercise = () => {
    setCurrentExercise(prev => (prev + 1) % typingExercises.length)
    setCurrentLineIndex(0)
    setUserInput('')
    setCurrentIndex(0)
    setCompleted(false)
    setErrors(0)
    setStartTime(null)
  }

  return (
    <div className="typing-practice" ref={containerRef}>
      <div className="section-header">
        <h2>MECANOGRAFIA</h2>
        <p>Mejora tu velocidad y precision</p>
      </div>

      <div className="typing-stats">
        <StatDisplay value={wpm} label="PPM" color="#00ffff" />
        <StatDisplay value={`${accuracy}%`} label="Precision" color="#ff00ff" />
        <StatDisplay value={errors} label="Errores" color="#6600ff" />
      </div>

      <div className="exercise-selector">
        {typingExercises.map((ex, idx) => (
          <button
            key={idx}
            className={`exercise-tab ${currentExercise === idx ? 'active' : ''}`}
            onClick={() => {
              setCurrentExercise(idx)
              setCurrentLineIndex(0)
              setUserInput('')
              setCurrentIndex(0)
              setCompleted(false)
              setErrors(0)
              setStartTime(null)
            }}
          >
            <span className="tab-number">{String(idx + 1).padStart(2, '0')}</span>
            <span className="tab-title">{ex.title}</span>
          </button>
        ))}
      </div>

      <div className="typing-container">
        <div className="exercise-info">
          <span className="category">{exercise.category}</span>
          <span className="title">{exercise.title}</span>
        </div>

        <TypingDisplay text={currentLine} currentIndex={currentIndex} />

        <textarea
          value={userInput}
          onChange={handleInput}
          className="typing-input"
          placeholder="Escribe aqui para practicar..."
          autoFocus
          disabled={completed}
        />

        {completed && (
          <div className="completion-overlay">
            <div className="completion-content">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <h3>Ejercicio Completado</h3>
              <p>PPM: {wpm} | Precision: {accuracy}%</p>
              <button className="next-btn" onClick={nextExercise}>
                Siguiente Ejercicio
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TypingPractice