import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

const exercises = {
  home: {
    title: 'Fila de Inicio',
    text: 'asdf jkl; asdf jkl; asdf jkl; fjdk sla; klas jfds;'
  },
  upper: {
    title: 'Fila Superior',
    text: 'qwer tyui op qwer tyui op rewu iopqew rty uio p'
  },
  lower: {
    title: 'Fila Inferior',
    text: 'zxcv bn m, zxcv bn m, cxzv bnm ,.zx cvbn m,'
  },
  numbers: {
    title: 'Numeros',
    text: '123 456 789 0 123 456 789 0 135 792 468 0'
  },
  practice: {
    title: 'Practica Libre',
    text: 'La practica constante es la clave del exito en mecanografia rapida y precisa.'
  }
}

function TypingPractice() {
  const [selected, setSelected] = useState('home')
  const [text, setText] = useState(exercises.home.text)
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

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
  }, [])

  const resetExercise = () => {
    setInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
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
    <div className="typing-practice" ref={containerRef}>
      <div className="section-header">
        <h2>MECANOGRAFIA</h2>
        <p>Practica tu velocidad y precision</p>
      </div>

      <div className="typing-stats">
        <div className="stat-display" style={{ '--stat-color': '#00ffff' }}>
          <span className="stat-value">{wpm}</span>
          <span className="stat-label">PPM</span>
        </div>
        <div className="stat-display" style={{ '--stat-color': accuracy >= 95 ? '#00ff88' : accuracy >= 80 ? '#ffaa00' : '#ff4444' }}>
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Precision</span>
        </div>
        <div className="stat-display" style={{ '--stat-color': '#ff00ff' }}>
          <span className="stat-value">{input.length}/{text.length}</span>
          <span className="stat-label">Progreso</span>
        </div>
      </div>

      <div className="exercise-selector">
        {Object.entries(exercises).map(([key, ex]) => (
          <button
            key={key}
            className={`exercise-tab ${selected === key ? 'active' : ''}`}
            onClick={() => handleSelect(key)}
          >
            <span className="tab-number">{key === 'home' ? '01' : key === 'upper' ? '02' : key === 'lower' ? '03' : key === 'numbers' ? '04' : '05'}</span>
            <span className="tab-title">{ex.title}</span>
          </button>
        ))}
      </div>

      <div className="typing-container">
        <div className="exercise-info">
          <span className="category">{exercises[selected].title}</span>
        </div>
        
        <div className="typing-display" onClick={() => inputRef.current?.focus()}>
          {renderText()}
        </div>
        
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          className="typing-input"
          placeholder="Comienza a escribir..."
          disabled={isComplete}
          autoFocus
        />

        {isComplete && (
          <div className="completion-overlay">
            <div className="completion-content">
              <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <h3>Completado!</h3>
              <p>{wpm} PPM con {accuracy}% de precision</p>
              <button className="next-btn" onClick={resetExercise}>
                <span>Repetir</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
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