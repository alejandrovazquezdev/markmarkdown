// Preprocesado markdown para el preview fiel.
//
// `react-markdown + remark-gfm` solo no renderiza varias sintaxis que el
// curriculum usa para practicar. Este modulo las normaliza antes del render:
//
// - Emojis `:shortcode:` -> unicode (remark-gfm no los convierte).
// - Footnotes `[^1]` -> `<sup>` + lista de notas (sin plugin de footnotes).
// - Callouts `> [!NOTE]` -> `> **NOTE:**` (cita GFM valida).
// - Definition lists `Termino\n: definicion` -> negrita + cita.
// - Frontmatter `--- yaml ---` -> se extrae y se muestra como bloque meta.
// - Mermaid no se toca aqui: `MarkdownPreview` lo detecta por lenguaje.

export const EMOJI_MAP = {
  rocket: '🚀',
  sparkles: '✨',
  warning: '⚠️',
  bug: '🐛',
  point_right: '👉',
  calendar: '📅',
  green_circle: '🟢',
  red_circle: '🔴',
  yellow_circle: '🟡',
}

export function replaceEmojiShortcodes(src = '') {
  return src.replace(/:([a-z0-9_+-]+):/gi, (m, name) => {
    const hit = EMOJI_MAP[String(name).toLowerCase()]
    return hit ?? m
  })
}

export function extractFrontmatter(src = '') {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { meta: null, body: src }
  return { meta: m[1].trim(), body: src.slice(m[0].length) }
}

export function transformCallouts(src = '') {
  return src.replace(/^>\s*\[!(NOTE|TIP|WARNING|DANGER)\]/gim, '> **$1:**')
}

export function transformDefinitionLists(src = '') {
  // `Termino` en una linea y `: definicion` en la siguiente.
  // No toca citas, tablas, listas, encabezados, codigo ni HTML.
  return src.replace(
    /^([^>\s#|\-*\d`\[!:][^\n]*)\n: (.+)$/gm,
    '**$1**\n\n> $2',
  )
}

export function extractFootnotes(src = '') {
  const notes = new Map()
  const body = src
    .replace(/^\[\^([^\]]+)\]:\s*(.+)$/gm, (_, id, text) => {
      if (!notes.has(id)) notes.set(id, text.trim())
      return ''
    })
    .replace(/^\n{3,}/gm, '\n\n')
    .trimEnd()

  if (notes.size === 0) return { body, notes: [] }

  const withRefs = body.replace(/\[\^([^\]]+)\]/g, (_, id) => {
    const order = [...notes.keys()].indexOf(id)
    const n = order >= 0 ? order + 1 : '?'
    return `<sup class="fn-ref">${n}</sup>`
  })

  const list = [...notes.values()]
    .map((text, i) => `<p class="fn-def"><sup>${i + 1}</sup> ${escapeHtml(text)}</p>`)
    .join('\n')

  return {
    body: `${withRefs}\n\n---\n\n${list}`,
    notes: [...notes.entries()],
  }
}

function escapeHtml(s = '') {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function preprocessMarkdown(src = '') {
  const { meta, body: withoutFm } = extractFrontmatter(src)
  const withCallouts = transformCallouts(transformDefinitionLists(withoutFm))
  const withEmoji = replaceEmojiShortcodes(withCallouts)
  const { body, notes } = extractFootnotes(withEmoji)
  return { body, meta, notes }
}
