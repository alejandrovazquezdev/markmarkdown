import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

const typingExercises = [
  { text: '# Titulo', description: 'Encabezado en Markdown' },
  { text: '**negrita**', description: 'Texto en negrita' },
  { text: '*cursiva*', description: 'Texto en cursiva' },
  { text: '[link](url)', description: 'Enlace en Markdown' },
  { text: '```codigo```', description: 'Bloque de codigo' },
  { text: '- item 1\n- item 2', description: 'Lista no ordenada' },
]

function TypingPractice() {
  const [currentText, setCurrentText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [completed, setCompleted] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const randomExercise = typingExercises[Math.floor(Math.random() * typingExercises.length)]
    setCurrentText(randomExercise.text)
  }, [])

  const handleInput = (e) => {
    const value = e.target.value
    if (!startTime) setStartTime(Date.now())
    
    setUserInput(value)
    setCharIndex(value.length)

    if (value === currentText) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60
      const words = currentText.split(' ').length
      setWpm(Math.round(words / timeElapsed))
      setCompleted(true)
      
      anime({
        targets: '.typing-container',
        scale: [1, 1.05, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
      })
    }
  }

  return (
    <div className="practice-section">
      <h2>Mecanografia</h2>
      <div className="typing-container">
        <div className="target-text">
          {currentText.split('').map((char, i) => (
            <span
              key={i}
              className={i < charIndex ? 'correct' : i === charIndex ? 'current' : ''}
            >
              {char === '\n' ? '↵' : char}
            </span>
          ))}
        </div>
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
          className="typing-input"
          placeholder="Escribe aqui..."
          autoFocus
        />
        {completed && (
          <div className="stats">
            <span>{wpm} WPM</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TypingPractice