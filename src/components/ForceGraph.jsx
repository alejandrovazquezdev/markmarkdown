import { useEffect, useMemo, useRef, useState } from 'react'

// Grafo de nodos interactivo: layout con fisica (repulsion + resortes +
// gravedad), arrastre de nodos, zoom y resaltado de vecinos al pasar el
// cursor. Es un grafo de verdad, no una animacion decorativa.
export default function ForceGraph({ nodes, edges, lang = 'es' }) {
  const [pos, setPos] = useState(() => new Map())
  const [hover, setHover] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [gen, setGen] = useState(0)
  const sim = useRef({ v: new Map(), alpha: 1, raf: 0 })
  const drag = useRef(null)
  const boxRef = useRef(null)
  const posRef = useRef(new Map())
  posRef.current = pos

  const W = 680
  const H = 420

  const degree = useMemo(() => {
    const d = new Map(nodes.map((n) => [n.id, 0]))
    edges.forEach((e) => {
      d.set(e.a, (d.get(e.a) ?? 0) + 1)
      d.set(e.b, (d.get(e.b) ?? 0) + 1)
    })
    return d
  }, [nodes, edges])

  const neighbors = useMemo(() => {
    const m = new Map()
    edges.forEach((e) => {
      if (!m.has(e.a)) m.set(e.a, new Set())
      if (!m.has(e.b)) m.set(e.b, new Set())
      m.get(e.a).add(e.b)
      m.get(e.b).add(e.a)
    })
    return m
  }, [edges])

  // Posiciones iniciales en circulo.
  useEffect(() => {
    const p = new Map()
    nodes.forEach((n, i) => {
      const a = (i / Math.max(1, nodes.length)) * Math.PI * 2 - Math.PI / 2
      p.set(n.id, { x: W / 2 + Math.cos(a) * W * 0.32, y: H / 2 + Math.sin(a) * H * 0.32 })
    })
    sim.current.v = new Map(nodes.map((n) => [n.id, { x: 0, y: 0 }]))
    sim.current.alpha = 1
    setPos(p)
    setGen((g) => g + 1)
  }, [nodes, edges])

  // Simulacion (lee posiciones siempre frescas via posRef).
  useEffect(() => {
    if (gen === 0 || posRef.current.size === 0) return
    sim.current.alpha = 1
    const step = () => {
      const s = sim.current
      if (s.alpha < 0.015) return
      const p = new Map(posRef.current)
      const ids = nodes.map((n) => n.id)
      // Repulsion.
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
          const a = p.get(ids[i])
          const b = p.get(ids[j])
          let dx = a.x - b.x
          let dy = a.y - b.y
          let d2 = dx * dx + dy * dy
          if (d2 < 1) {
            dx = Math.random() - 0.5
            dy = Math.random() - 0.5
            d2 = 1
          }
          const f = Math.min(9000 / d2, 6) * s.alpha
          const d = Math.sqrt(d2)
          const fx = (dx / d) * f
          const fy = (dy / d) * f
          const va = s.v.get(ids[i])
          const vb = s.v.get(ids[j])
          va.x += fx
          va.y += fy
          vb.x -= fx
          vb.y -= fy
        }
      }
      // Resortes.
      edges.forEach((e) => {
        const a = p.get(e.a)
        const b = p.get(e.b)
        if (!a || !b) return
        const dx = b.x - a.x
        const dy = b.y - a.y
        const d = Math.hypot(dx, dy) || 1
        const f = ((d - 130) * 0.02 + (e.hot ? 0.6 : 0)) * s.alpha
        const fx = (dx / d) * f
        const fy = (dy / d) * f
        const va = s.v.get(e.a)
        const vb = s.v.get(e.b)
        va.x += fx
        va.y += fy
        vb.x -= fx
        vb.y -= fy
      })
      // Gravedad + integracion.
      ids.forEach((id) => {
        if (drag.current === id) return
        const q = p.get(id)
        const v = s.v.get(id)
        v.x += (W / 2 - q.x) * 0.008 * s.alpha
        v.y += (H / 2 - q.y) * 0.008 * s.alpha
        v.x *= 0.82
        v.y *= 0.82
        q.x = Math.min(W - 30, Math.max(30, q.x + v.x * s.alpha * 4))
        q.y = Math.min(H - 24, Math.max(24, q.y + v.y * s.alpha * 4))
      })
      s.alpha *= 0.985
      setPos(p)
      s.raf = requestAnimationFrame(step)
    }
    sim.current.raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(sim.current.raf)
  }, [gen])

  const toSvg = (e) => {
    const rect = boxRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    }
  }

  const dim = (id) => hover && hover !== id && !neighbors.get(hover)?.has(id)

  return (
    <div className="force-wrap">
      <div className="force-tools">
        <button type="button" onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(2)))} aria-label="zoom in">
          +
        </button>
        <button type="button" onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))} aria-label="zoom out">
          −
        </button>
        <button type="button" onClick={() => { setZoom(1); setGen((g) => g + 1) }} aria-label="reset">
          ⟲
        </button>
        <span className="force-hint">
          {lang === 'es' ? 'arrastra los nodos · pasa el cursor para ver vecinos' : 'drag nodes · hover to see neighbors'}
        </span>
      </div>
      <svg
        ref={boxRef}
        viewBox={`0 0 ${W} ${H}`}
        className="force-svg"
        role="img"
        aria-label={lang === 'es' ? 'Vista grafica interactiva' : 'Interactive graph view'}
      >
        <g transform={`translate(${W / 2} ${H / 2}) scale(${zoom}) translate(${-W / 2} ${-H / 2})`}>
          {edges.map((e) => {
            const a = pos.get(e.a)
            const b = pos.get(e.b)
            if (!a || !b) return null
            const hot = e.hot || (hover && (e.a === hover || e.b === hover))
            const faint = hover && e.a !== hover && e.b !== hover
            return (
              <line
                key={e.key}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={`force-edge${hot ? ' is-hot' : ''}`}
                opacity={faint ? 0.08 : undefined}
              />
            )
          })}
          {nodes.map((n) => {
            const p = pos.get(n.id)
            if (!p) return null
            const r = 7 + Math.min(6, (degree.get(n.id) ?? 0) * 2)
            return (
              <g
                key={n.id}
                transform={`translate(${p.x} ${p.y})`}
                className={`force-node${dim(n.id) ? ' is-dim' : ''}`}
                opacity={dim(n.id) ? 0.25 : 1}
                onPointerDown={(e) => {
                  e.target.setPointerCapture?.(e.pointerId)
                  drag.current = n.id
                  sim.current.alpha = Math.max(sim.current.alpha, 0.4)
                }}
                onPointerMove={(e) => {
                  if (drag.current !== n.id) return
                  const q = toSvg(e)
                  setPos((prev) => new Map(prev).set(n.id, q))
                }}
                onPointerUp={() => {
                  drag.current = null
                  setGen((g) => g + 1)
                }}
                onPointerEnter={() => setHover(n.id)}
                onPointerLeave={() => setHover((h) => (h === n.id ? null : h))}
              >
                <circle r={r + 7} className="force-halo" />
                <circle r={r} className={`force-dot kind-${n.kind}`} />
                <text y={r + 16} textAnchor="middle" className="force-label">
                  {n.label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
