// Mini baul estilo Obsidian para la seccion /obsidian.
// Nombres y cuerpos bilingues. Los bloques citables llevan su ^id al final.

export const VAULT_FOLDERS = [
  { id: 'inbox', name: { es: '00-Inbox', en: '00-Inbox' } },
  { id: 'proyectos', name: { es: 'Proyectos', en: 'Projects' } },
  { id: 'imagenes', name: { es: '999-Imagenes', en: '999-Images' } },
]

export const VAULT_NOTES = [
  {
    id: 'bienvenida',
    folder: 'inbox',
    name: { es: 'Bienvenida', en: 'Welcome' },
    body: {
      es: ['# Bienvenida', '', 'Este baul es pequeno a proposito.', 'Todo enlaza con todo. ^hilo', '', 'Empieza por [[Proyectos]] y marca esta nota con #inicio.', '', 'Nada aqui es definitivo: todo se reescribe. ^borrador', '', 'Lee despacio y enlaza sin miedo.'],
      en: ['# Welcome', '', 'This vault is tiny on purpose.', 'Everything links to everything. ^thread', '', 'Start with [[Projects]] and tag this note #start.', '', 'Nothing here is final: everything gets rewritten. ^draft', '', 'Read slowly and link without fear.'],
    },
  },
  {
    id: 'proyectos',
    folder: 'proyectos',
    name: { es: 'Proyectos', en: 'Projects' },
    body: {
      es: ['# Proyectos', '', '## Metas', '', 'Shippear markmarkdown ==este mes==. ^meta', '', 'Revisar el tablero cada viernes. ^viernes', '', '- [ ] Publicar la version 1.0', '- [x] Abrir el baul', '', '> [!tip] Ritmo', '> Un enlace al dia mantiene el grafo vivo.', '', 'Ideas sueltas viven en [[Ideas]] con etiqueta #envio.'],
      en: ['# Projects', '', '## Goals', '', 'Ship markmarkdown ==this month==. ^goal', '', 'Review the board every Friday. ^friday', '', '- [ ] Ship version 1.0', '- [x] Open the vault', '', '> [!tip] Pace', '> One link a day keeps the graph alive.', '', 'Loose ideas live in [[Ideas]] tagged #shipping.'],
    },
  },
  {
    id: 'ideas',
    folder: 'proyectos',
    name: { es: 'Ideas', en: 'Ideas' },
    body: {
      es: ['# Ideas', '', 'Toda nota es una semilla. ^semilla', '', 'Regar a diario: releer y enlazar. ^riego', '', 'Anota sin juzgar: editar viene despues.', '', 'Lo tachado ~~ya no sirve~~ y lo ==clave== brilla.', '', 'Las semillas #jardin crecen primero.'],
      en: ['# Ideas', '', 'Every note is a seed. ^seed', '', 'Water daily: reread and link. ^water', '', 'Capture without judging: editing comes later.', '', 'The struck ~~no longer serves~~ and the ==key== bits shine.', '', 'Seeds tagged #garden grow first.'],
    },
  },
  {
    id: 'baul',
    folder: 'inbox',
    name: { es: 'Mi baul', en: 'My vault' },
    body: {
      es: ['# Mi baul', '', 'Mapa de lo importante: [[Proyectos]] e [[Ideas]].', '', 'Todo vuelve aqui. ^mapa', '', 'Este mapa cambia: vuelve cada semana.', '', 'Archiva lo viejo con #archivo y sigue.', '', '> [!quote] El mapa no es el territorio', '> Pero ayuda a no perderse.'],
      en: ['# My vault', '', 'Map of what matters: [[Projects]] and [[Ideas]].', '', 'Everything leads back here. ^map', '', 'This map changes: revisit weekly.', '', 'Archive the old with #archive and move on.', '', '> [!quote] The map is not the territory', '> But it keeps you from getting lost.'],
    },
  },
  {
    id: 'imagen',
    folder: 'imagenes',
    name: { es: 'imagenejemplo.png', en: 'imagenejemplo.png' },
    image: '/imagenejemplo.png',
    body: { es: [], en: [] },
  },
]

export function findNote(name = '', lang = 'es') {
  const norm = name.trim().toLowerCase()
  return VAULT_NOTES.find((n) => {
    const l = lang === 'en' ? n.name.en : n.name.es
    if (l.toLowerCase() === norm) return true
    const other = lang === 'en' ? n.name.es : n.name.en
    return other.toLowerCase() === norm
  })
}

// Busca el bloque `^id` dentro de una nota y devuelve su texto limpio.
export function findBlock(note, blockId = '', lang = 'es') {
  if (!note || note.image) return null
  const lines = lang === 'en' ? note.body.en : note.body.es
  const tag = `^${blockId}`
  for (const line of lines) {
    if (line.includes(tag)) {
      return line.replace(tag, '').trim()
    }
  }
  return null
}

// Devuelve las lineas bajo un encabezado ## hasta el siguiente encabezado.
export function findSection(note, heading = '', lang = 'es') {
  if (!note || note.image) return null
  const lines = lang === 'en' ? note.body.en : note.body.es
  const norm = (h) => h.replace(/^#+\s*/, '').trim().toLowerCase()
  const want = heading.trim().toLowerCase()
  let start = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^#+\s/.test(lines[i]) && norm(lines[i]) === want) {
      start = i + 1
      break
    }
  }
  if (start < 0) return null
  const out = []
  for (let i = start; i < lines.length; i++) {
    if (/^#+\s/.test(lines[i])) break
    out.push(lines[i])
  }
  while (out.length && out[0].trim() === '') out.shift()
  while (out.length && out[out.length - 1].trim() === '') out.pop()
  return out.length ? out : null
}

export function noteTitle(note, lang = 'es') {
  if (!note) return ''
  return lang === 'en' ? note.name.en : note.name.es
}
