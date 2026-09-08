// Utilidades del motor de mecanografia.
//
// Bugs que corrige:
// - `text.split('')` rompe emojis y clusters (pares subrogados, ZWJ, banderas,
//   diacriticos combinados). Se segmenta por grafemas con `Intl.Segmenter`.
// - WPM = Infinity cuando el tiempo transcurrido es ~0, y accuracy = NaN con
//   input vacio. Ambos quedan blindados.

export function segmentGraphemes(str = '') {
  try {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
      return Array.from(seg.segment(str), (s) => s.segment)
    }
  } catch {
    // fallback
  }
  return Array.from(str)
}

export function countCorrect(inputGraphemes, targetGraphemes) {
  const n = Math.min(inputGraphemes.length, targetGraphemes.length)
  let correct = 0
  for (let i = 0; i < n; i++) {
    if (inputGraphemes[i] === targetGraphemes[i]) correct++
  }
  return { correct, compared: n }
}

export function computeStats({ input, target, startTime, now = Date.now() }) {
  const inputG = segmentGraphemes(input)
  const targetG = segmentGraphemes(target)

  if (!startTime || inputG.length === 0) {
    const { correct } = countCorrect(inputG, targetG)
    const accuracy = inputG.length === 0 ? 100 : Math.round((correct / inputG.length) * 100)
    return { wpm: 0, accuracy, inputG, targetG }
  }

  const minutes = (now - startTime) / 60000
  const wpm = minutes > 0 ? Math.round(inputG.length / 5 / minutes) : 0

  const { correct } = countCorrect(inputG, targetG)
  const accuracy = inputG.length > 0 ? Math.round((correct / inputG.length) * 100) : 100

  return {
    wpm: Number.isFinite(wpm) ? Math.max(0, wpm) : 0,
    accuracy: Number.isFinite(accuracy) ? accuracy : 100,
    inputG,
    targetG,
  }
}
