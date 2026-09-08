// Helpers para resolver las claves i18n a partir de los ids del curriculum.
//
// Bugs que corrige:
// - Los ids del curriculum estan en kebab-case (`lists-basic`) pero las
//   claves de `translations.js` estan en camelCase (`listsBasic`).
//   El codigo anterior solo quitaba los guiones (`listsbasic`) y nunca
//   encontraba la traduccion.
// - Las fases se buscan por significado (`basics` -> `fundamentos`), no por id.
// - El nivel `strikethrough` (intermedio) usa las claves `strikethroughAdv*`.

export const kebabToCamel = (s = '') =>
  s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())

const LEVEL_ALIAS = {
  strikethrough: 'strikethroughAdv',
}

export function levelKey(id = '') {
  if (LEVEL_ALIAS[id]) return LEVEL_ALIAS[id]
  return kebabToCamel(id)
}

export function levelDescKey(id = '') {
  return `${levelKey(id)}Desc`
}

export const PHASE_KEY = {
  basics: 'fundamentos',
  intermediate: 'intermedio',
  advanced: 'avanzado',
  master: 'master',
  professional: 'profesional',
}

export function phaseKey(id = '') {
  return PHASE_KEY[id] ?? id
}

export function phaseDescKey(id = '') {
  return `${phaseKey(id)}Desc`
}
