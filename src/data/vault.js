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
      es: ['# Bienvenida', '', 'Este baul es pequeno a proposito.', 'Todo enlaza con todo. ^hilo', '', 'Empieza por [[Proyectos]].'],
      en: ['# Welcome', '', 'This vault is tiny on purpose.', 'Everything links to everything. ^thread', '', 'Start with [[Projects]].'],
    },
  },
  {
    id: 'proyectos',
    folder: 'proyectos',
    name: { es: 'Proyectos', en: 'Projects' },
    body: {
      es: ['# Proyectos', '', '## Metas', '', 'Shippear markmarkdown este mes. ^meta', '', 'Ideas sueltas viven en [[Ideas]].'],
      en: ['# Projects', '', '## Goals', '', 'Ship markmarkdown this month. ^goal', '', 'Loose ideas live in [[Ideas]].'],
    },
  },
  {
    id: 'ideas',
    folder: 'proyectos',
    name: { es: 'Ideas', en: 'Ideas' },
    body: {
      es: ['# Ideas', '', 'Toda nota es una semilla. ^semilla', '', 'Regar a diario: releer y enlazar.'],
      en: ['# Ideas', '', 'Every note is a seed. ^seed', '', 'Water daily: reread and link.'],
    },
  },
  {
    id: 'baul',
    folder: 'inbox',
    name: { es: 'Mi baul', en: 'My vault' },
    body: {
      es: ['# Mi baul', '', 'Mapa de lo importante: [[Proyectos]] e [[Ideas]].', '', 'Vuelven aqui. ^mapa'],
      en: ['# My vault', '', 'Map of what matters: [[Projects]] and [[Ideas]].', '', 'They lead back here. ^map'],
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

export function noteTitle(note, lang = 'es') {
  if (!note) return ''
  return lang === 'en' ? note.name.en : note.name.es
}
