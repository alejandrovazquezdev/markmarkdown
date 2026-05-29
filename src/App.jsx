import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene3D from './components/Scene3D'
import TypingPractice from './components/TypingPractice'
import MarkdownPractice from './components/MarkdownPractice'
import Roadmap from './components/Roadmap'
import Navbar from './components/Navbar'
import './styles/App.css'

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    import('animejs').then(({ default: anime }) => {
      anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1500,
        easing: 'easeOutExpo'
      })
    })
  }, [])

  return (
    <div ref={appRef} className="app">
      <Canvas className="bg-canvas">
        <Scene3D />
      </Canvas>
      <Navbar />
      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">markmarkdown</h1>
          <p className="hero-subtitle">Practica mecanografia, markdown y vim</p>
        </section>
        <Roadmap />
        <section className="practices">
          <TypingPractice />
          <MarkdownPractice />
        </section>
      </main>
    </div>
  )
}

export default App