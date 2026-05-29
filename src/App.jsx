import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import { curriculum, getTotalLevels, getLevelByIndex } from './data/curriculum'
import './styles/global.css'

function Home() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [completedLevels, setCompletedLevels] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const levelData = getLevelByIndex(currentLevel)
  const totalLevels = getTotalLevels()
  const progress = Math.round((completedLevels.length / totalLevels) * 100)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentLevel])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0'
      containerRef.current.style.transform = 'translateY(20px)'
      setTimeout(() => {
        containerRef.current.style.transition = 'all 0.5s ease'
        containerRef.current.style.opacity = '1'
        containerRef.current.style.transform = 'translateY(0)'
      }, 50)
    }
  }, [currentLevel])

  const handleInput = (e) => {
    const val = e.target.value
    setInput(val)

    if (!startTime && val.length > 0) {
      setStartTime(Date.now())
    }

    const targetText = levelData.content

    if (val.length === targetText.length) {
      if (val === targetText) {
        setIsComplete(true)
        if (!completedLevels.includes(currentLevel)) {
          setCompletedLevels([...completedLevels, currentLevel])
        }
      }
    }

    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 60000
      const wordsTyped = val.length / 5
      setWpm(Math.round(wordsTyped / timeElapsed))

      let correct = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i] === targetText[i]) correct++
      }
      setAccuracy(Math.round((correct / val.length) * 100))
    }
  }

  const nextLevel = () => {
    if (currentLevel < totalLevels - 1) {
      setCurrentLevel(currentLevel + 1)
      resetLevel()
    }
  }

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1)
      resetLevel()
    }
  }

  const resetLevel = () => {
    setInput('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const goToLevel = (idx) => {
    setCurrentLevel(idx)
    resetLevel()
  }

  const renderText = () => {
    const text = levelData.content
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
    <div className="unified-app">
      <Canvas className="bg-canvas" camera={{ position: [0, 0, 30], fov: 60 }}>
        <Scene3D />
      </Canvas>
      
      <Navbar />
      
      <main className="main-container">
        {/* Progress Header */}
        <div className="progress-header">
          <div className="phase-indicator">
            <span className="phase-label">{levelData?.phase?.title}</span>
            <span className="level-indicator">Nivel {currentLevel + 1} de {totalLevels}</span>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-value">{wpm}</span>
              <span className="stat-label">PPM</span>
            </div>
            <div className="stat">
              <span className="stat-value" style={{ color: accuracy >= 95 ? '#00ff88' : accuracy >= 80 ? '#ffaa00' : '#ff4466' }}>{accuracy}%</span>
              <span className="stat-label">Precision</span>
            </div>
            <div className="stat">
              <span className="stat-value">{progress}%</span>
              <span className="stat-label">Progreso</span>
            </div>
          </div>
        </div>

        {/* Current Level Card */}
        <div className="level-card" ref={containerRef} style={{ '--accent': levelData?.phase?.color }}>
          <div className="level-header">
            <h2>{levelData?.title}</h2>
            <p>{levelData?.description}</p>
          </div>
          
          <div className="focus-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            <span>Enfoca: {levelData?.focus}</span>
          </div>

          <div className="typing-area">
            <div className="text-display" onClick={() => inputRef.current?.focus()}>
              {renderText()}
            </div>
            
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInput}
              className="typing-input"
              placeholder="Escribe aqui..."
              disabled={isComplete}
              autoFocus
            />
          </div>

          {/* Completion Modal */}
          {isComplete && (
            <div className="completion-overlay">
              <div className="completion-card">
                <div className="completion-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                </div>
                <h3>Completado!</h3>
                <div className="completion-stats">
                  <div className="completion-stat">
                    <span className="num">{wpm}</span>
                    <span className="label">PPM</span>
                  </div>
                  <div className="completion-stat">
                    <span className="num">{accuracy}%</span>
                    <span className="label">Precision</span>
                  </div>
                </div>
                <div className="completion-actions">
                  <button className="btn-secondary" onClick={resetLevel}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                    </svg>
                    Repetir
                  </button>
                  {currentLevel < totalLevels - 1 ? (
                    <button className="btn-primary" onClick={nextLevel}>
                      Siguiente
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ) : (
                    <span className="finish-badge">Fin del curriculum!</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="level-navigation">
          <button 
            className="nav-btn prev" 
            onClick={prevLevel}
            disabled={currentLevel === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Anterior
          </button>
          
          <div className="level-dots">
            {Array.from({ length: totalLevels }).map((_, i) => (
              <button
                key={i}
                className={`level-dot ${i === currentLevel ? 'active' : ''} ${completedLevels.includes(i) ? 'completed' : ''}`}
                onClick={() => goToLevel(i)}
              />
            ))}
          </div>
          
          <button 
            className="nav-btn next" 
            onClick={nextLevel}
            disabled={currentLevel === totalLevels - 1}
          >
            Siguiente
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Curriculum Overview */}
        <div className="curriculum-overview">
          <h3>Curriculum Completo</h3>
          <div className="phases-list">
            {curriculum.phases.map((phase) => (
              <div key={phase.id} className="phase-section" style={{ '--phase-color': phase.color }}>
                <div className="phase-header">
                  <span className="phase-title">{phase.title}</span>
                  <span className="phase-count">{phase.levels.length} niveles</span>
                </div>
                <div className="phase-levels">
                  {phase.levels.map((level, i) => {
                    const globalIndex = curriculum.phases.indexOf(phase) === 0 
                      ? i 
                      : curriculum.phases.slice(0, curriculum.phases.indexOf(phase)).reduce((acc, p) => acc + p.levels.length, 0) + i
                    return (
                      <button
                        key={level.id}
                        className={`level-btn ${globalIndex === currentLevel ? 'current' : ''} ${completedLevels.includes(globalIndex) ? 'completed' : ''}`}
                        onClick={() => goToLevel(globalIndex)}
                      >
                        {completedLevels.includes(globalIndex) ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        ) : (
                          <span>{globalIndex + 1}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App