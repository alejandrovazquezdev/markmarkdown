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

import { findNote, findBlock } from '../data/vault'

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

function escapeAttr(s = '') {
  return escapeHtml(s).replace(/"/g, '&quot;')
}

const IMAGE_EXT = /\.(png|jpe?g|gif|svg|webp|avif)$/i
const EXAMPLE_IMAGE = 'imagenejemplo.png'

// Parte el fuente en bloques de codigo (fences ``` y `inline`) y texto.
// Las transformaciones solo aplican al texto: lo que esta en codigo se
// escribe literal y no debe linkificarse.
function splitProtected(src = '') {
  const parts = []
  const fenceRe = /(```[\s\S]*?(?:```|$))/g
  let last = 0
  let m
  const pushInline = (text) => {
    const inlineRe = /(`[^`\n]+`)/g
    let l2 = 0
    let m2
    while ((m2 = inlineRe.exec(text)) !== null) {
      if (m2.index > l2) parts.push({ code: false, text: text.slice(l2, m2.index) })
      parts.push({ code: true, text: m2[0] })
      l2 = m2.index + m2[0].length
    }
    if (l2 < text.length) parts.push({ code: false, text: text.slice(l2) })
  }
  while ((m = fenceRe.exec(src)) !== null) {
    if (m.index > last) pushInline(src.slice(last, m.index))
    parts.push({ code: true, text: m[0] })
    last = m.index + m[0].length
  }
  if (last < src.length) pushInline(src.slice(last))
  return parts
}

function transformObText(text = '', lang = 'es', links) {
  // 1. Embeds ![[...]] (antes que los links para no chocar con [[...]]).
  text = text.replace(/!\[\[([^\]\n]+)\]\]/g, (_, inner) => {
    const bar = inner.indexOf('|')
    const rawTarget = (bar >= 0 ? inner.slice(0, bar) : inner).trim()
    const size = bar >= 0 ? parseInt(inner.slice(bar + 1), 10) : NaN
    const width = Number.isFinite(size) && size > 0 ? Math.min(size, 900) : 0
    if (!rawTarget) return _
    // Separa posible #seccion o #^bloque del destino.
    let target = rawTarget
    let anchor = null
    const hash = rawTarget.indexOf('#')
    if (hash >= 0) {
      anchor = rawTarget.slice(hash + 1).trim()
      target = rawTarget.slice(0, hash).trim()
    }
    if (IMAGE_EXT.test(target)) {
      const base = target.split('/').pop().toLowerCase()
      if (base === EXAMPLE_IMAGE) {
        const style = width ? ` style="width:${width}px"` : ''
        return `<img class="ob-img" src="/${EXAMPLE_IMAGE}" alt="${escapeAttr(target)}"${style} loading="lazy" />`
      }
      return `<span class="ob-missing">imagen no encontrada: ${escapeHtml(target)}</span>`
    }
    // Cita textual de un bloque: ![[nota#^id]] muestra esa frase exacta.
    if (anchor && anchor.startsWith('^')) {
      const note = findNote(target, lang)
      const quote = note ? findBlock(note, anchor.slice(1), lang) : null
      links.push(target)
      if (quote) {
        const head = lang === 'es' ? `cita textual de ${target}` : `exact quote from ${target}`
        return `<div class="ob-transclude ob-blockref"><div class="ob-transclude-head">${escapeHtml(head)} · ^${escapeHtml(anchor.slice(1))}</div><p class="ob-quote">“${escapeHtml(quote)}”</p></div>`
      }
      return `<span class="ob-missing">bloque ^${escapeHtml(anchor.slice(1))} no encontrado en ${escapeHtml(target)}</span>`
    }
    links.push(target)
    const head = lang === 'es' ? 'Fragmento incrustado' : 'Embedded fragment'
    const hint =
      lang === 'es'
        ? 'En Obsidian aqui se ve el contenido real de la nota.'
        : 'In Obsidian the real note content shows here.'
    return `<div class="ob-transclude"><div class="ob-transclude-head">fragmento de ${escapeHtml(target)}</div><p>${head} de «${escapeHtml(target)}».</p><p class="ob-transclude-hint">${hint}</p></div>`
  })

  // 2. Wikilinks [[nota]], [[nota|alias]], [[nota#seccion]], [[nota#sec|alias]].
  text = text.replace(/\[\[([^\]\n]+)\]\]/g, (full, inner) => {
    let target = inner
    let alias = null
    const pipe = inner.indexOf('|')
    if (pipe >= 0) {
      target = inner.slice(0, pipe)
      alias = inner.slice(pipe + 1)
    }
    let anchor = null
    const hash = target.indexOf('#')
    if (hash >= 0) {
      anchor = target.slice(hash + 1).trim()
      target = target.slice(0, hash)
    }
    target = target.trim()
    if (!target) return full
    links.push(target)
    const show = `${(alias ?? target).trim()}${anchor ? ` › ${anchor}` : ''}`
    return `<span class="ob-link">${escapeHtml(show)}</span>`
  })

  return text
}

export function transformObsidian(src = '', lang = 'es') {
  const links = []
  const body = splitProtected(src)
    .map((p) => (p.code ? p.text : transformObText(p.text, lang, links)))
    .join('')
  return { body, links: [...new Set(links)] }
}

export function preprocessMarkdown(src = '', opts = {}) {
  const lang = opts.lang === 'en' ? 'en' : 'es'
  const { meta, body: withoutFm } = extractFrontmatter(src)
  const { body: obBody, links } = transformObsidian(withoutFm, lang)
  const withCallouts = transformCallouts(transformDefinitionLists(obBody))
  const withEmoji = replaceEmojiShortcodes(withCallouts)
  const { body, notes } = extractFootnotes(withEmoji)
  return { body, meta, notes, links }
}
