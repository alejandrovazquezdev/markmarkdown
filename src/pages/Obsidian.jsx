import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MiniDrill from '../components/MiniDrill'
import ForceGraph from '../components/ForceGraph'
import { useLanguage } from '../i18n/LanguageContext'
import { VAULT_FOLDERS, VAULT_NOTES, findNote, noteTitle } from '../data/vault'
import { transformObsidian } from '../lib/markdown'
import { obsidianCopy } from './obsidianCopy'
import '../styles/obsidian.css'

const MarkdownPreview = lazy(() => import('../components/MarkdownPreview'))

function buildGraph(lang) {
  const nodes = VAULT_NOTES.map((n) => ({
    id: n.id,
    label: noteTitle(n, lang),
    kind: n.image ? 'image' : 'note',
  }))
  const edges = []
  VAULT_NOTES.forEach((n) => {
    if (n.image) return
    const text = (lang === 'en' ? n.body.en : n.body.es).join('\n')
    transformObsidian(text, lang).links.forEach((name) => {
      const t = findNote(name, lang)
      if (t && t.id !== n.id && !edges.some((e) => e.key === `${n.id}>${t.id}`)) {
        edges.push({ a: n.id, b: t.id, key: `${n.id}>${t.id}` })
      }
    })
  })
  return { nodes, edges }
}

function DrillPreview({ target, lang }) {
  const [val, setVal] = useState('')
  return (
    <div className="ob-drill-preview">
      <MiniDrill target={target} lang={lang} onInput={setVal} />
      <div className="ob-drill-out">
        <div className="ob-drill-out-head">{lang === 'es' ? '// resultado en vivo' : '// live result'}</div>
        <Suspense fallback={<span className="md-loading">$ render…</span>}>
          <MarkdownPreview source={val} lang={lang} />
        </Suspense>
      </div>
    </div>
  )
}

function ResizeDemo({ lang, label }) {
  const [w, setW] = useState(400)
  return (
    <div className="ob-resize">
      <label className="ob-slider-row">
        <span>{label}</span>
        <input
          type="range"
          min={120}
          max={800}
          step={10}
          value={w}
          onChange={(e) => setW(Number(e.target.value))}
          aria-label={label}
        />
        <code>{w}px</code>
      </label>
      <p className="ob-syntax">![[imagenejemplo.png|{w}]]</p>
      <div className="ob-resize-out">
        <Suspense fallback={<span className="md-loading">$ render…</span>}>
          <MarkdownPreview source={`![[imagenejemplo.png|${w}]]`} lang={lang} showGraph={false} />
        </Suspense>
      </div>
    </div>
  )
}

function BlockPicker({ lang, blocks, pickLabel }) {
  const [ref, setRef] = useState(blocks[0].ref)
  // Al cambiar de idioma los ^id cambian: resetea al primero del idioma.
  useEffect(() => {
    setRef(blocks[0].ref)
  }, [lang, blocks])
  return (
    <div className="ob-blockpick-wrap">
      <div className="ob-blockpick" role="group" aria-label={pickLabel}>
        <span className="ob-blockpick-label">{pickLabel}</span>
        {blocks.map((b) => (
          <button
            key={b.ref}
            type="button"
            onClick={() => setRef(b.ref)}
            className={`ob-blockpick-btn${b.ref === ref ? ' is-active' : ''}`}
          >
            {b.label}
          </button>
        ))}
      </div>
      <DrillPreview key={ref} target={`![[${ref}]]`} lang={lang} />
    </div>
  )
}

function GraphLesson({ lang, copy }) {
  const { nodes, edges } = useMemo(() => buildGraph(lang), [lang])
  const [tour, setTour] = useState(-1)
  const hot = useMemo(
    () => edges.map((e, i) => ({ ...e, hot: i <= tour })),
    [edges, tour],
  )
  const done = tour >= edges.length - 1
  const labelOf = (id) => nodes.find((n) => n.id === id)?.label ?? id
  return (
    <div className="ob-graph-lesson">
      <ul className="ob-legend" aria-label="legend">
        <li><span className="ob-dot-sample is-you" aria-hidden="true" />{copy.legendYou}</li>
        <li><span className="ob-dot-sample is-note" aria-hidden="true" />{copy.legendNote}</li>
        <li><span className="ob-dot-sample is-image" aria-hidden="true" />{copy.legendImage}</li>
      </ul>
      <ForceGraph nodes={nodes} edges={hot} lang={lang} />
      <p className="ob-conn-title">{copy.connectionsTitle}</p>
      <ol className="ob-conn-list">
        {edges.map((e, i) => (
          <li key={e.key} className={i <= tour ? 'is-seen' : ''}>
            <span className="ob-conn-num">{i + 1}</span>
            {labelOf(e.a)} <span aria-hidden="true">→</span> {labelOf(e.b)}
          </li>
        ))}
      </ol>
      <div className="ob-tour-row">
        {!done ? (
          <button type="button" className="btn-primary" onClick={() => setTour((t) => t + 1)}>
            {copy.tourNext} ({tour + 1}/{edges.length})
          </button>
        ) : (
          <span className="ob-tour-done">{copy.tourDone}</span>
        )}
        {tour >= 0 && (
          <button type="button" className="btn-secondary" onClick={() => setTour(-1)}>
            {copy.tourReset}
          </button>
        )}
      </div>
    </div>
  )
}

function Explorer({ lang, activeId, onSelect }) {
  const c = obsidianCopy[lang]
  return (
    <nav className="ob-explorer" aria-label={c.explorerTitle}>
      <p className="ob-pane-title">{c.explorerTitle}</p>
      {VAULT_FOLDERS.map((f) => (
        <div key={f.id} className="ob-folder">
          <p className="ob-folder-name">› {lang === 'en' ? f.name.en : f.name.es}</p>
          <ul>
            {VAULT_NOTES.filter((n) => n.folder === f.id).map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => onSelect(n.id)}
                  className={`ob-note-btn${n.id === activeId ? ' is-active' : ''}`}
                >
                  <span aria-hidden="true">{n.image ? '🖼' : '📄'}</span> {noteTitle(n, lang)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function NoteViewer({ lang, note, backlinks, onOpen }) {
  const c = obsidianCopy[lang]
  if (!note) return null
  return (
    <div className="ob-viewer">
      <p className="ob-pane-title">
        {c.viewerTitle} · {noteTitle(note, lang)}
      </p>
      {note.image ? (
        <img src={note.image} alt={noteTitle(note, lang)} className="ob-viewer-img" />
      ) : (
        <Suspense fallback={<span className="md-loading">$ render…</span>}>
          <MarkdownPreview
            source={(lang === 'en' ? note.body.en : note.body.es).join('\n')}
            lang={lang}
            showGraph={false}
          />
        </Suspense>
      )}
      {!note.image && (
        <div className="ob-backlinks">
          <p className="ob-backlinks-title">{c.backlinksTitle}</p>
          {backlinks.length === 0 ? (
            <p className="ob-backlinks-none">{c.backlinksNone}</p>
          ) : (
            <ul>
              {backlinks.map((b) => (
                <li key={b.id}>
                  <button type="button" onClick={() => onOpen(b.id)} className="ob-backlink-btn">
                    ← {noteTitle(b, lang)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default function Obsidian() {
  const { lang, toggleLang } = useLanguage()
  const c = obsidianCopy[lang] ?? obsidianCopy.es
  const [activeId, setActiveId] = useState('bienvenida')
  const explorerRef = useRef(null)
  const active = VAULT_NOTES.find((n) => n.id === activeId)

  const backlinks = useMemo(() => {
    if (!active || active.image) return []
    return VAULT_NOTES.filter((n) => {
      if (n.id === active.id || n.image) return false
      const text = (lang === 'en' ? n.body.en : n.body.es).join('\n')
      return transformObsidian(text, lang).links.some((name) => findNote(name, lang)?.id === active.id)
    })
  }, [active, lang])

  const openNote = (id) => {
    setActiveId(id)
    explorerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <div className="obsidian">
      <a className="skip-link" href="#ob-contenido">
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <Navbar variant="trainer" tag={c.label} lang={lang} onToggleLang={toggleLang} />

      <main id="ob-contenido" className="ob-main">
        <header className="ob-hero">
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            {c.heroKicker}
          </p>
          <h1 className="ob-title">
            {c.heroTitleA}
            <br />
            <span className="accent-ob">{c.heroTitleB}</span>
          </h1>
          <p className="ob-sub">{c.heroSub}</p>
          <div className="hero-ctas">
            <a className="btn-primary btn-lg" href="#ob-lecciones">
              {c.startCta}
            </a>
            <a className="btn-secondary btn-lg" href="#ob-lesson-graph">
              {c.graphCta}
            </a>
          </div>
        </header>

        <div className="ob-workbench" ref={explorerRef}>
          <Explorer lang={lang} activeId={activeId} onSelect={setActiveId} />
          <NoteViewer lang={lang} note={active} backlinks={backlinks} onOpen={openNote} />
        </div>

        <div id="ob-lecciones" className="ob-lessons-head">
          <p className="kicker">{c.lessonsKicker}</p>
          <h2 className="section-title">{c.lessonsTitle}</h2>
        </div>

        {c.lessons.map((l) => (
          <section key={l.id} id={`ob-lesson-${l.id}`} className="ob-lesson" aria-labelledby={`ob-t-${l.id}`}>
            <h3 id={`ob-t-${l.id}`}>{l.title}</h3>
            {l.intro.map((p, i) => (
              <p key={i} className="ob-intro">
                {p}
              </p>
            ))}
            <ul className="ob-tips">
              {l.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            {l.id === 'graph' ? (
              <GraphLesson lang={lang} copy={l} />
            ) : l.id === 'blockref' ? (
              <BlockPicker lang={lang} blocks={l.blocks} pickLabel={l.pickLabel} />
            ) : (
              <DrillPreview target={l.drill} lang={lang} />
            )}
            {l.id === 'resize' && <ResizeDemo lang={lang} label={l.sliderLabel} />}
            {l.id === 'transclude' && (
              <button type="button" className="ob-original-btn" onClick={() => openNote('proyectos')}>
                {l.seeOriginal}
              </button>
            )}
          </section>
        ))}

        <section className="final" aria-labelledby="ob-final-t">
          <div className="final-inner">
            <h2 id="ob-final-t">{c.ctaTitle}</h2>
            <p>{c.ctaSub}</p>
            <Link className="btn-primary btn-lg" to="/app">
              {c.ctaBtn}
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
