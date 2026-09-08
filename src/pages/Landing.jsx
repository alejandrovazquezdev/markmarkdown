import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLanguage } from '../i18n/LanguageContext'
import { curriculum } from '../data/curriculum'
import { levelKey, phaseKey, phaseDescKey } from '../lib/keys'
import { landingCopy, DEMO_SOURCE } from './landingCopy'
import '../styles/landing.css'

const MarkdownPreview = lazy(() => import('../components/MarkdownPreview'))

function PreviewFallback() {
  return (
    <div className="md-loading" role="status" aria-label="cargando preview">
      <span>$ render…</span>
    </div>
  )
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        obs.unobserve(entry.target)
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function useTypewriter(text, { speed = 34, pause = 2600 } = {}) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      setDone(true)
      return
    }
    let i = 0
    let timer
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        timer = setTimeout(() => {
          if (cancelled) return
          i = 0
          setDone(false)
          setOut('')
          timer = setTimeout(tick, 500)
        }, pause)
        return
      }
      const ch = text[i - 1]
      const wait = ch === '\n' ? speed * 8 : speed + Math.random() * speed
      timer = setTimeout(tick, wait)
    }
    timer = setTimeout(tick, 600)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [text, speed, pause])

  return { out, done }
}

const STACK = ['React', 'Vite', 'Three.js', 'GFM', 'KaTeX', 'ES/EN']

export default function Landing() {
  const { lang, t, toggleLang } = useLanguage()
  const c = landingCopy[lang] ?? landingCopy.es
  const { out: typed, done: typedDone } = useTypewriter(c.heroDemoSrc)

  return (
    <div className="landing">
      <a className="skip-link" href="#contenido">
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <Navbar variant="landing" lang={lang} onToggleLang={toggleLang} strings={c} />

      <main id="contenido">
        {/* HERO */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-glow" />
          </div>

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="kicker">
                <span className="kicker-dot" aria-hidden="true" />
                {c.heroKicker}
              </p>
              <h1 className="hero-title">
                {c.heroTitleA}
                <br />
                <span className="accent">{c.heroTitleB}</span>
              </h1>
              <p className="hero-sub">{c.heroSub}</p>
              <div className="hero-ctas">
                <Link className="btn-primary btn-lg" to="/app">
                  {c.heroPrimary}
                </Link>
                <a className="btn-secondary btn-lg" href="#curriculo">
                  {c.heroSecondary}
                </a>
              </div>
              <p className="hero-note">{c.heroNote}</p>

              <dl className="hero-stats">
                {c.stats.map((s) => (
                  <div className="hero-stat" key={s.label}>
                    <dt className="hero-stat-num">{s.num}</dt>
                    <dd className="hero-stat-label">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hero-art" aria-label={c.heroTerminalTab}>
              <div className="term-window">
                <div className="term-bar">
                  <span className="term-dots" aria-hidden="true">
                    <i /><i /><i />
                  </span>
                  <span className="term-tab">{c.heroTerminalTab}</span>
                  <span className="term-badge">{c.heroTerminalBadge}</span>
                </div>
                <div className="term-split">
                  <div className="term-src">
                    <pre aria-live="off">
                      {typed}
                      <span className={`term-caret ${typedDone ? 'blink' : ''}`} aria-hidden="true" />
                    </pre>
                  </div>
                  <div className="term-out">
                    <Suspense fallback={<PreviewFallback />}>
                      <MarkdownPreview source={typed} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stack-strip">
            <span className="stack-label">{c.stackLabel}</span>
            <ul>
              {STACK.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </header>

        {/* DEMO */}
        <section className="section demo" id="demo" aria-labelledby="demo-title">
          <Reveal>
            <p className="kicker">{c.demoKicker}</p>
            <h2 id="demo-title" className="section-title">{c.demoTitle}</h2>
            <p className="section-sub">{c.demoSub}</p>
            <ul className="chip-row">
              {c.demoChips.map((chip) => (
                <li key={chip} className="chip">{chip}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="demo-split">
              <div className="demo-panel">
                <div className="demo-panel-head">
                  <span>{c.demoSrcLabel}</span>
                </div>
                <pre className="demo-src">{DEMO_SOURCE}</pre>
              </div>
              <div className="demo-panel">
                <div className="demo-panel-head">
                  <span>{c.demoOutLabel}</span>
                  <span className="demo-live">● live</span>
                </div>
                <Suspense fallback={<PreviewFallback />}>
                  <MarkdownPreview source={DEMO_SOURCE} />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </section>

        {/* COMO */}
        <section className="section how" id="como" aria-labelledby="how-title">
          <Reveal>
            <p className="kicker">{c.howKicker}</p>
            <h2 id="how-title" className="section-title">{c.howTitle}</h2>
          </Reveal>
          <div className="steps">
            {c.steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <article className="step">
                  <span className="step-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CURRICULO */}
        <section className="section curriculum-landing" id="curriculo" aria-labelledby="curr-title">
          <Reveal>
            <p className="kicker">{c.currKicker}</p>
            <h2 id="curr-title" className="section-title">{c.currTitle}</h2>
            <p className="section-sub">{c.currSub}</p>
          </Reveal>
          <div className="phase-grid">
            {curriculum.phases.map((phase, i) => {
              const title = t(phaseKey(phase.id))
              const desc = t(phaseDescKey(phase.id))
              const sample = phase.levels.slice(0, 3).map((l) => {
                const k = levelKey(l.id)
                const hit = t(k)
                return hit !== k ? hit : l.id
              })
              return (
                <Reveal key={phase.id} delay={(i % 3) * 90}>
                  <article className="phase-card" style={{ '--phase-color': phase.color }}>
                    <header>
                      <span className="phase-index">0{i + 1}</span>
                      <span className="phase-count">{phase.levels.length} · {lang === 'es' ? 'niveles' : 'levels'}</span>
                    </header>
                    <h3>{title !== phaseKey(phase.id) ? title : phase.id}</h3>
                    <p className="phase-desc">{desc !== phaseDescKey(phase.id) ? desc : ''}</p>
                    <ul className="phase-sample">
                      {sample.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                      <li className="more">…</li>
                    </ul>
                    <Link className="phase-cta" to="/app">{c.currCta}</Link>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* FEATURES */}
        <section className="section features" aria-labelledby="feat-title">
          <Reveal>
            <p className="kicker">{c.featKicker}</p>
            <h2 id="feat-title" className="section-title">{c.featTitle}</h2>
          </Reveal>
          <div className="feature-grid">
            {c.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90}>
                <article className="feature-card">
                  <span className="feature-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL */}
        <section className="final" aria-labelledby="final-title">
          <Reveal className="final-inner">
            <h2 id="final-title">{c.finalTitle}</h2>
            <p>{c.finalSub}</p>
            <Link className="btn-primary btn-lg" to="/app">
              {c.finalCta}
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-text">markmarkdown<span className="cursor" /></span>
            <span className="footer-tag">{c.footerTag}</span>
          </div>
          <nav className="footer-nav" aria-label="footer">
            <Link to="/app">{c.footerTrainer}</Link>
            <a href="https://github.com/alejandrovazquezdev/markmarkdown" target="_blank" rel="noreferrer">
              {c.footerRepo}
            </a>
          </nav>
        </div>
        <p className="footer-note">{c.footerNote}</p>
      </footer>
    </div>
  )
}
