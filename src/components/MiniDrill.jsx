import { useMemo, useState } from 'react'
import { computeStats } from '../lib/typing'

// Drill compacto para /obsidian: tipea el objetivo, ve cada tecla
// calificada y tu precision en vivo.
export default function MiniDrill({ target = '', lang = 'es', hint, onInput }) {
  const [value, setValue] = useState('')
  const [start, setStart] = useState(null)
  const [done, setDone] = useState(false)

  const stats = useMemo(
    () => computeStats({ input: value, target, startTime: start }),
    [value, target, start],
  )
  const { inputG, targetG } = stats

  const handle = (e) => {
    const val = e.target.value
    setValue(val)
    onInput?.(val)
    if (!start && val.length > 0) setStart(Date.now())
    if (val === target && target.length > 0) setDone(true)
    else if (done) setDone(false)
  }

  const reset = () => {
    setValue('')
    setStart(null)
    setDone(false)
    onInput?.('')
  }

  return (
    <div className={`mini-drill${done ? ' is-done' : ''}`}>
      <div className="mini-drill-text" aria-label={hint ?? target}>
        {targetG.map((ch, i) => {
          const isCurrent = i === inputG.length
          const isTyped = i < inputG.length
          let cls = 'char'
          if (isTyped) cls += inputG[i] === ch ? ' correct' : ' incorrect'
          else if (isCurrent) cls += ' current'
          if (ch === ' ') cls += ' space'
          if (ch === '\n') {
            return (
              <span key={i} className={`${cls} nl`}>
                {isCurrent ? '⏎\n' : '\n'}
              </span>
            )
          }
          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          )
        })}
      </div>
      <div className="mini-drill-row">
        <textarea
          value={value}
          onChange={handle}
          rows={Math.min(4, target.split('\n').length + 1)}
          maxLength={target.length}
          className="mini-drill-input"
          placeholder={lang === 'es' ? '$ escríbelo aquí…' : '$ type it here…'}
          aria-label={lang === 'es' ? 'Practica aquí' : 'Practice here'}
        />
        <div className="mini-drill-meta">
          <span className="mini-drill-acc">{stats.accuracy}%</span>
          {done ? (
            <span className="mini-drill-ok">✓</span>
          ) : (
            <button type="button" className="mini-drill-reset" onClick={reset} aria-label="reset">
              ~
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
