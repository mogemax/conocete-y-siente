import { MODULES } from '../content'
import { STEPS } from './steps'

const ORDER = MODULES.map((m) => m.id)

// Posición de la tira de números para cada paso: índice del módulo + avance dentro de él
// (contando solo los pasos con números). Las mediciones congelan la última posición visible,
// así al volver a aparecer la tira se desliza desde donde se quedó.
const POSITIONS = (() => {
  const shown = {}
  STEPS.forEach((s, i) => !s.measure && (shown[s.module] ??= []).push(i))
  let last = 0
  return STEPS.map((s, i) => {
    if (s.measure) return last
    const list = shown[s.module]
    last = ORDER.indexOf(s.module) + list.indexOf(i) / list.length
    return last
  })
})()

/** Estado de los números de fondo (escritorio) en el paso `index`. */
export const numeralsAt = (index) => ({
  position: POSITIONS[index],
  hidden: Boolean(STEPS[index].measure),
  intro: Boolean(STEPS[index].intro),
})
