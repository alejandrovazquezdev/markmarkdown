// Mini vista grafica estilo Obsidian: cuando el preview contiene [[links]],
// dibuja el nodo actual conectado a cada nota enlazada. El ultimo enlace
// entra con animacion (draw + pop) y las aristas fluyen en loop.

function short(name = '', n = 12) {
  return name.length > n ? `${name.slice(0, n - 1)}…` : name
}

export default function ObsidianGraph({ links = [], lang = 'es' }) {
  const nodes = links.slice(0, 8)
  if (nodes.length === 0) return null

  const W = 340
  const H = 180
  const cx = W / 2
  const cy = H / 2
  const rx = 128
  const ry = 62

  const title = lang === 'es' ? 'vista grafica' : 'graph view'
  const me = lang === 'es' ? 'esta nota' : 'this note'
  const extra = links.length > nodes.length ? links.length - nodes.length : 0

  const pts = nodes.map((name, i) => {
    const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
    return { name, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), fresh: i === nodes.length - 1 }
  })

  return (
    <div className="ob-graph" role="img" aria-label={`${title}: ${nodes.join(', ')}`}>
      <div className="ob-graph-head">
        <span className="ob-graph-title">{title}</span>
        <span className="ob-graph-count">
          {nodes.length + 1} {lang === 'es' ? 'nodos' : 'nodes'}
          {extra > 0 ? ` +${extra}` : ''}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="ob-graph-svg" aria-hidden="true">
        {pts.map((p, i) => (
          <line
            key={`e-${p.name}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            pathLength={1}
            style={{ animationDelay: `${i * 110}ms` }}
            className={`ob-edge${p.fresh ? ' is-fresh' : ''}`}
          />
        ))}
        {pts.map((p, i) => (
          <g key={`n-${p.name}`} style={{ animationDelay: `${i * 110}ms` }} className={`ob-node${p.fresh ? ' is-fresh' : ''}`}>
            <circle cx={p.x} cy={p.y} r={p.fresh ? 7 : 5} className="ob-dot" />
            <text x={p.x} y={p.y + 20} textAnchor="middle" className="ob-label">
              {short(p.name)}
            </text>
          </g>
        ))}
        <g className="ob-node is-me">
          <circle cx={cx} cy={cy} r={9} className="ob-dot is-me" />
          <text x={cx} y={cy + 24} textAnchor="middle" className="ob-label is-me">
            {me}
          </text>
        </g>
      </svg>
    </div>
  )
}
