import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { curriculum, getTotalLevels, getLevelByIndex } from './data/curriculum'
import './styles/global.css'

function Home() {
  const { t, lang, toggleLang } = useLanguage()
  const [currentLevel, setCurrentLevel] = useState(0)
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [completedLevels, setCompletedLevels] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [showGuide, setShowGuide] = useState(false)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const levelData = getLevelByIndex(currentLevel, lang)
  const totalLevels = getTotalLevels()
  const progress = Math.round((completedLevels.length / totalLevels) * 100)

  const getLevelTitle = (level) => {
    const key = level.id.replace(/-/g, '')
    return t(key) !== key ? t(key) : key
  }

  const getLevelDesc = (level) => {
    const key = level.id.replace(/-/g, '') + 'Desc'
    return t(key) !== key ? t(key) : key
  }

  const getLevelFocus = (level) => {
    return level.focus
  }

  const getPhaseTitle = (phase) => {
    const key = phase.id.replace(/-/g, '')
    return t(key) !== key ? t(key) : key
  }

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

      <Navbar lang={lang} onToggleLang={toggleLang} />

      <main className="main-container">
        {/* Progress Header */}
        <div className="progress-header">
          <div className="phase-indicator">
            <span className="phase-label">// {getPhaseTitle(levelData?.phase)}</span>
            <span className="level-indicator">$ {t('level')} {currentLevel + 1}/{totalLevels}</span>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-label">$ {t('ppm').toLowerCase()}</span>
              <span className="stat-value">{wpm}</span>
            </div>
            <div className="stat">
              <span className="stat-label">$ {t('acc').toLowerCase()}</span>
              <span className="stat-value" style={{ color: accuracy >= 95 ? 'var(--terminal-green)' : accuracy >= 80 ? 'var(--terminal-amber)' : 'var(--terminal-red)' }}>{accuracy}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">$ {t('done').toLowerCase()}</span>
              <span className="stat-value">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Current Level Card */}
        <div className="level-card" ref={containerRef} style={{ '--accent': levelData?.phase?.color }}>
          <div className="level-header">
            <h2>{getLevelTitle(levelData)}</h2>
            <p>{getLevelDesc(levelData)}</p>
          </div>

          <div className="focus-hint">
            <span className="focus-tag">[{getLevelFocus(levelData)}]</span>
            <button className="guide-btn" onClick={() => setShowGuide(true)}>
              {t('guideBtn')}
            </button>
          </div>

          <div className="typing-area">
            <div className="typing-split">
              <div className="typing-panel writing-panel">
                <div className="panel-header">
                  <span className="panel-title">{t('sourceMd')}</span>
                  <span className="panel-badge">{t('input')}</span>
                </div>
                <div className="text-display" onClick={() => inputRef.current?.focus()}>
                  {renderText()}
                </div>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInput}
                  className="typing-input"
                  placeholder={t('writeHere')}
                  disabled={isComplete}
                  autoFocus
                />
              </div>

              <div className="typing-panel preview-panel">
                <div className="panel-header">
                  <span className="panel-title">{t('output')}</span>
                  <span className="panel-badge preview-badge">{t('preview')}</span>
                </div>
                <div className="markdown-preview">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{input || '...'}</ReactMarkdown>
                </div>
              </div>
            </div>
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
                <h3>{t('levelComplete')}</h3>
                <div className="completion-stats">
                  <div className="completion-stat">
                    <span className="num">{wpm}</span>
                    <span className="label">{t('ppm').toLowerCase()}</span>
                  </div>
                  <div className="completion-stat">
                    <span className="num">{accuracy}%</span>
                    <span className="label">{t('acc').toLowerCase()}</span>
                  </div>
                </div>
                <div className="completion-actions">
                  <button className="btn-secondary" onClick={resetLevel}>
                    {t('repeat')}
                  </button>
                  {currentLevel < totalLevels - 1 ? (
                    <button className="btn-primary" onClick={nextLevel}>
                      {t('next')}
                    </button>
                  ) : (
                    <span className="finish-badge">// fin</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Typing Guide Modal */}
          {showGuide && (
            <div className="guide-overlay" onClick={() => setShowGuide(false)}>
              <div className="guide-modal" onClick={e => e.stopPropagation()}>
                <div className="guide-title-bar">
                  <span className="guide-title">{t('typingGuide')}</span>
                  <button className="guide-close-btn" onClick={() => setShowGuide(false)}>
                    {t('close')}
                  </button>
                </div>

                <div className="guide-content">
                  <div className="guide-section">
                    <div className="guide-section-title">{t('fingerPosition')}</div>
                    <div className="keyboard-diagram">
                      <div className="keyboard-section">
                        <div className="section-label">{t('leftHand')}</div>
                        <div className="finger-row">
                          <div className="finger-zone pinky">
                            <span className="finger-name">{t('pinky')}</span>
                            <div className="key-row">A Q 1</div>
                          </div>
                          <div className="finger-zone ring">
                            <span className="finger-name">{t('ring')}</span>
                            <div className="key-row">S W 2</div>
                          </div>
                          <div className="finger-zone middle">
                            <span className="finger-name">{t('middle')}</span>
                            <div className="key-row">D E 3</div>
                          </div>
                          <div className="finger-zone index">
                            <span className="finger-name">{t('index')}</span>
                            <div className="key-row">F R T G</div>
                          </div>
                        </div>
                      </div>

                      <div className="keyboard-section">
                        <div className="section-label">{t('rightHand')}</div>
                        <div className="finger-row">
                          <div className="finger-zone index">
                            <span className="finger-name">{t('index')}</span>
                            <div className="key-row">Y H N U</div>
                          </div>
                          <div className="finger-zone middle">
                            <span className="finger-name">{t('middle')}</span>
                            <div className="key-row">I K</div>
                          </div>
                          <div className="finger-zone ring">
                            <span className="finger-name">{t('ring')}</span>
                            <div className="key-row">O L</div>
                          </div>
                          <div className="finger-zone pinky">
                            <span className="finger-name">{t('pinky')}</span>
                            <div className="key-row">P + -</div>
                          </div>
                        </div>
                      </div>

                      <div className="thumb-section">
                        <div className="finger-zone thumb">
                          <span className="finger-name">{t('thumb')}</span>
                          <div className="key-row">{t('spacebar')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="guide-section">
                    <div className="guide-section-title">{t('tips')}</div>
                    <div className="guide-tips">
                      <div className="guide-tip">
                        <div className="tip-icon home-marker">F</div>
                        <div className="tip-text">{t('homeKeysTip')}</div>
                      </div>
                      <div className="guide-tip">
                        <div className="tip-icon">~</div>
                        <div className="tip-text">{t('zonesTip')}</div>
                      </div>
                      <div className="guide-tip">
                        <div className="tip-icon">_</div>
                        <div className="tip-text">{t('thumbTip')}</div>
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary guide-done-btn" onClick={() => setShowGuide(false)}>
                    {t('understood')}
                  </button>
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
            {t('prev')}
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
            {t('nextNav')}
          </button>
        </div>

        {/* Curriculum Overview */}
        <div className="curriculum-overview">
          <h3>{t('curriculumOverview')}</h3>
          <div className="phases-list">
            {curriculum.phases.map((phase) => (
              <div key={phase.id} className="phase-section" style={{ '--phase-color': phase.color }}>
                <div className="phase-header">
                  <span className="phase-title">{getPhaseTitle(phase)}</span>
                  <span className="phase-count">{phase.levels.length} {t('levels')}</span>
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
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
