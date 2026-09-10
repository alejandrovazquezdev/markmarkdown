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

import { findNote, findBlock, findSection } from '../data/vault.js'

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

export function transformCallouts(src = '', lang = 'es') {
  const CALLOUT_META = {
    note: { icon: '✎', label: { es: 'Nota', en: 'Note' } },
    info: { icon: 'ℹ', label: { es: 'Info', en: 'Info' } },
    tip: { icon: '✦', label: { es: 'Consejo', en: 'Tip' } },
    success: { icon: '✓', label: { es: 'Éxito', en: 'Success' } },
    question: { icon: '?', label: { es: 'Pregunta', en: 'Question' } },
    warning: { icon: '⚠', label: { es: 'Aviso', en: 'Warning' } },
    failure: { icon: '✖', label: { es: 'Fallo', en: 'Failure' } },
    danger: { icon: '‼', label: { es: 'Peligro', en: 'Danger' } },
    bug: { icon: '🐛', label: { es: 'Bug', en: 'Bug' } },
    example: { icon: '☰', label: { es: 'Ejemplo', en: 'Example' } },
    quote: { icon: '❝', label: { es: 'Cita', en: 'Quote' } },
    todo: { icon: '☑', label: { es: 'Pendiente', en: 'Todo' } },
  }
  const lines = src.split('\n')
  const out = []
  let i = 0
  while (i < lines.length) {
    const m = lines[i].match(/^>\s*\[!([\w-]+)\]([-+]?)\s*(.*)$/)
    if (!m) {
      out.push(lines[i])
      i++
      continue
    }
    const type = m[1].toLowerCase()
    const fold = m[2]
    const customTitle = m[3].trim()
    const meta = CALLOUT_META[type] ?? { icon: '✎', label: { es: type, en: type } }
    const title = customTitle || (lang === 'en' ? meta.label.en : meta.label.es)
    const bodyLines = []
    i++
    while (i < lines.length && /^\s*>/.test(lines[i])) {
      bodyLines.push(lines[i].replace(/^\s*> ?/, ''))
      i++
    }
    // Quita líneas vacías de borde, conserva las internas.
    while (bodyLines.length && bodyLines[0].trim() === '') bodyLines.shift()
    while (bodyLines.length && bodyLines[bodyLines.length - 1].trim() === '') bodyLines.pop()
    const body = bodyLines.map((l) => (l.trim() === '' ? '' : `<p>${renderRichLine(l, lang)}</p>`)).join('\n')
    const head = `<div class="ob-callout-head"><span class="ob-callout-icon">${meta.icon}</span>${escapeHtml(title)}</div>`
    if (fold === '-') {
      out.push(
        `<details class="ob-callout t-${escapeAttr(type)}"><summary class="ob-callout-head"><span class="ob-callout-icon">${meta.icon}</span>${escapeHtml(title)}</summary><div class="ob-callout-body">${body}</div></details>`,
      )
    } else if (fold === '+') {
      out.push(
        `<details class="ob-callout t-${escapeAttr(type)}" open><summary class="ob-callout-head"><span class="ob-callout-icon">${meta.icon}</span>${escapeHtml(title)}</summary><div class="ob-callout-body">${body}</div></details>`,
      )
    } else {
      out.push(`<div class="ob-callout t-${escapeAttr(type)}">${head}<div class="ob-callout-body">${body}</div></div>`)
    }
  }
  return out.join('\n')
}

export function transformDefinitionLists(src = '') {
  // `Termino` en una linea y `: definicion` en la siguiente.
  // No toca citas, tablas, listas, encabezados, codigo ni HTML.
  return src.replace(
    /^([^>\s#|\-*\d`[!:][^\n]*)\n: (.+)$/gm,
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

function transformObText(text = '', lang = 'es', links, depth = 0) {
  // 0. Comentarios %%...%%: existen en fuente pero no se ven.
  text = text.replace(/%%[\s\S]*?%%/g, '')

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
      if (depth > 0) return `<span class="ob-link">imag: ${escapeHtml(target)}</span>`
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
    // Transclusion de seccion: ![[nota#Seccion]] vuelca ese apartado.
    if (anchor) {
      const note = findNote(target, lang)
      const section = note ? findSection(note, anchor, lang) : null
      links.push(target)
      const head = lang === 'es' ? `seccion ${anchor} de ${target}` : `${anchor} section of ${target}`
      if (section) {
        const rendered = section.map((l) => renderBoxLine(l, lang)).join('\n')
        return `<div class="ob-transclude"><div class="ob-transclude-head">${escapeHtml(head)}</div>${rendered}</div>`
      }
      return `<span class="ob-missing">seccion ${escapeHtml(anchor)} no encontrada en ${escapeHtml(target)}</span>`
    }
    // Transclusion de nota entera: vuelca su texto real invocado.
    if (depth > 0) {
      links.push(target)
      return `<span class="ob-link">nota: ${escapeHtml(target)}</span>`
    }
    const note = findNote(target, lang)
    links.push(target)
    const head = lang === 'es' ? `nota ${target}` : `${target} note`
    if (note && !note.image) {
      const lines = (lang === 'en' ? note.body.en : note.body.es).filter((l) => l.trim() !== '')
      const rendered = lines.map((l) => renderBoxLine(l, lang)).join('\n')
      return `<div class="ob-transclude"><div class="ob-transclude-head">${escapeHtml(head)}</div>${rendered}</div>`
    }
    const generic = lang === 'es' ? 'Fragmento incrustado' : 'Embedded fragment'
    const hint =
      lang === 'es'
        ? 'En Obsidian aqui se ve el contenido real de la nota.'
        : 'In Obsidian the real note content shows here.'
    return `<div class="ob-transclude"><div class="ob-transclude-head">${escapeHtml(head)}</div><p>${generic} de «${escapeHtml(target)}».</p><p class="ob-transclude-hint">${hint}</p></div>`
  })

  // 2. Wikilinks [[nota]], [[nota|alias]], [[nota#seccion]], [[#seccion]].
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
    if (!target) {
      // Enlace a la misma nota: [[#Seccion]] o [[#^bloque]].
      if (!anchor) return full
      const show = anchor.startsWith('^') ? anchor : `› ${anchor}`
      return `<span class="ob-link ob-same">${escapeHtml(show)}</span>`
    }
    links.push(target)
    const show = `${(alias ?? target).trim()}${anchor ? ` › ${anchor}` : ''}`
    return `<span class="ob-link">${escapeHtml(show)}</span>`
  })

  // 3. Resaltado ==texto== estilo Obsidian.
  text = text.replace(/==([^=\n]+)==/g, '<mark>$1</mark>')

  // 4. Tags #etiqueta (no encabezados: exigen letra pegada al #).
  text = text.replace(/(^|[\s(>])#([\p{L}][\p{L}\p{N}_/-]*)/gu, '$1<span class="ob-tag">#$2</span>')

  return text
}

const TAG_RE = /(<\/?(?:span|mark|code|strong|em|del|sup|sub|a|img|br)\b[^>]*>)/g

function inlineMd(esc = '') {
  return esc
    .replace(/`([^`\n]+)`/g, '<code class="md-inline-code">$1</code>')
    .replace(/\*\*([^*<\n][^*<\n]*)\*\*/g, '<strong>$1</strong>')
    .replace(/~~([^~<\n]+)~~/g, '<del>$1</del>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<em>$2</em>')
}

// Convierte una linea suelta a HTML final (para cajas y callouts, que no
// pasan por ReactMarkdown): respeta chips/tags ya generados y escapa el resto.
function processInlineMixed(s = '') {
  return s
    .split(TAG_RE)
    .map((part, i) => (i % 2 === 1 ? part : inlineMd(escapeHtml(part))))
    .join('')
}

function renderRichLine(rawLine = '', lang = 'es') {
  return processInlineMixed(transformObText(rawLine, lang, [], 1))
}

// Una linea del cuerpo de una nota invocada, con jerarquia visual.
function renderBoxLine(rawLine = '', lang = 'es') {
  const line = rawLine.trim()
  if (line === '') return ''
  const h = line.match(/^(#{1,3})\s+(.*)$/)
  if (h) {
    return `<p class="ob-t-h${h[1].length}">${renderRichLine(h[2], lang)}</p>`
  }
  const call = line.match(/^>\s*\[!([\w-]+)\]\s*(.*)$/)
  if (call) {
    const type = call[1].toLowerCase()
    const title = call[2].trim() || type
    return `<p class="ob-t-call"><span class="ob-callout-icon">✦</span>${escapeHtml(title)}</p>`
  }
  const quote = line.match(/^>\s?(.*)$/)
  if (quote) {
    return `<p class="ob-t-quote">${renderRichLine(quote[1], lang)}</p>`
  }
  const task = line.match(/^[-*] \[([ x])\]\s+(.*)$/)
  if (task) {
    const on = task[1] === 'x'
    return `<p class="ob-t-li"><span aria-hidden="true">${on ? '☑' : '☐'} </span>${renderRichLine(task[2], lang)}</p>`
  }
  const li = line.match(/^[-*]\s+(.*)$/)
  if (li) {
    return `<p class="ob-t-li"><span aria-hidden="true">› </span>${renderRichLine(li[1], lang)}</p>`
  }
  return `<p>${renderRichLine(line, lang)}</p>`
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
  const withCallouts = transformCallouts(transformDefinitionLists(obBody), lang)
  const withEmoji = replaceEmojiShortcodes(withCallouts)
  const { body, notes } = extractFootnotes(withEmoji)
  return { body, meta, notes, links }
}
