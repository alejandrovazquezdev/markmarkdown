import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

const exercises = {
  home: {
    title: 'Fila de Inicio',
    description: 'Las teclas base del teclado',
    text: 'asdf jkl; asdf jkl; asdf jkl; fjdk sla; klas jfds; alsj fjdk lsaj fdkj'
  },
  upper: {
    title: 'Fila Superior',
    description: 'Teclas superiores del teclado',
    text: 'qwer tyui op qwer tyui op rewu iopqew rty uio p rety opwu qier tuop rowe'
  },
  lower: {
    title: 'Fila Inferior',
    description: 'Teclas inferiores del teclado',
    text: 'zxcv bn m, zxcv bn m, cxzv bnm ,.zx cvbn m, zxcv bnm xzvc nbm'
  },
  numbers: {
    title: 'Numeros',
    description: 'Teclas numericas',
    text: '123 456 789 0 123 456 789 0 135 792 468 0 246 813 579 0'
  },
  practice: {
    title: 'Practica Libre',
    description: 'Texto completo para practicar',
    text: 'La practica constante es la clave del exito. Cada dia que practicas te acercas mas a la velocidad que deseas.'
  }
}

function Typing() {
  const [selected, setSelected] = useState('home')
  const [text, setText] = useState(exercises.home.text)
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)
  const [time, setTime] = useState(0)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      easing: 'easeOutExpo'
    })
  }, [])

  useEffect(() => {
    if (startTime && !endTime) {
      timerRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000))
      }, 100)
    }
    return () => clearInterval(timerRef.current)
  }, [startTime, endTime])

  const resetExercise = () => {
    setInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    setTime(0)
    clearInterval(timerRef.current)
    inputRef.current?.focus()
  }

  const handleSelect = (key) => {
    setSelected(key)
    setText(exercises[key].text)
    resetExercise()
  }

  const handleInput = (e) => {
    const val = e.target.value
    setInput(val)

    if (!startTime && val.length > 0) {
      setStartTime(Date.now())
    }

    if (val.length === text.length) {
      setEndTime(Date.now())
      setIsComplete(true)
      clearInterval(timerRef.current)
    }

    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 60000
      const wordsTyped = val.length / 5
      setWpm(Math.round(wordsTyped / timeElapsed))

      let correct = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i] === text[i]) correct++
      }
      setAccuracy(Math.round((correct / val.length) * 100))
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const renderText = () => {
    return text.split('').map((char, i) => {
      let className = 'char'
      if (i < input.length) {
        className += input[i] === char ? ' correct' : ' incorrect'
      } else if (i === input.length) {
        className += ' current'
      }
      if (char === ' ') className += ' space'
      return <span key={i} className={className}>{char}</span>
    })
  }

  return (
    <div className="page typing-page" ref={containerRef}>
      <div className="page-header">
        <h1>Mecanografia</h1>
        <p>Practica tu velocidad y precision</p>
      </div>

      <div className="exercise-selector">
        {Object.entries(exercises).map(([key, ex], idx) => (
          <button
            key={key}
            className={`exercise-btn ${selected === key ? 'active' : ''}`}
            onClick={() => handleSelect(key)}
          >
            <span className="btn-number">{String(idx + 1).padStart(2, '0')}</span>
            <span className="btn-text">{ex.title}</span>
          </button>
        ))}
      </div>

      <div className="stats-bar">
        <div className="stat-box">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </span>
          <div className="stat-content">
            <span className="stat-value">{wpm}</span>
            <span className="stat-label">PPM</span>
          </div>
        </div>
        
        <div className="stat-box">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </span>
          <div className="stat-content">
            <span className="stat-value">{formatTime(time)}</span>
            <span className="stat-label">Tiempo</span>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </span>
          <div className="stat-content">
            <span className="stat-value" style={{ color: accuracy >= 95 ? '#00ff88' : accuracy >= 80 ? '#ffaa00' : '#ff4444' }}>{accuracy}%</span>
            <span className="stat-label">Precision</span>
          </div>
        </div>

        <div className="stat-box">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </span>
          <div className="stat-content">
            <span className="stat-value">{input.length}</span>
            <span className="stat-label">/ {text.length}</span>
          </div>
        </div>
      </div>

      <div className="exercise-container">
        <div className="exercise-info">
          <h2>{exercises[selected].title}</h2>
          <p>{exercises[selected].description}</p>
        </div>

        <div 
          className="typing-display"
          onClick={() => inputRef.current?.focus()}
        >
          {renderText()}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          className="typing-input"
          placeholder="Haz clic aqui y comienza a escribir..."
          disabled={isComplete}
          autoFocus
        />

        {isComplete && (
          <div className="completion-modal">
            <div className="modal-content">
              <div className="modal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <h3>Completado!</h3>
              <div className="result-stats">
                <div className="result-item">
                  <span className="result-value">{wpm}</span>
                  <span className="result-label">PPM</span>
                </div>
                <div className="result-item">
                  <span className="result-value">{accuracy}%</span>
                  <span className="result-label">Precision</span>
                </div>
                <div className="result-item">
                  <span className="result-value">{formatTime(time)}</span>
                  <span className="result-label">Tiempo</span>
                </div>
              </div>
              <button className="reset-btn" onClick={resetExercise}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6"/>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                Repetir Ejercicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Typing