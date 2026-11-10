import { MEASUREMENT_SITUATIONS, STATEMENTS, TARGET_LEVEL } from '../content'

const round1 = (n) => Math.round(n * 10) / 10

export function average(values) {
  const nums = values.filter((v) => typeof v === 'number')
  return nums.length ? round1(nums.reduce((a, b) => a + b, 0) / nums.length) : null
}

export const situationLevels = (measure) => MEASUREMENT_SITUATIONS.map((s) => measure.situations[s.id] ?? null)

export function isMeasureComplete(measure) {
  return (
    measure.level != null &&
    measure.statements.length === STATEMENTS.length &&
    measure.statements.every((v) => v != null) &&
    situationLevels(measure).every((v) => v != null)
  )
}

/** Resumen numérico de una aplicación del instrumento. "Acierto" = opción de nivel 3 o más. */
export function summarize(measure) {
  const levels = situationLevels(measure)
  return {
    level: measure.level,
    statementsAvg: average(measure.statements),
    situationsAvg: average(levels),
    hits: levels.filter((l) => l != null && l >= TARGET_LEVEL).length,
  }
}

/** 'up' | 'same' | 'down' según el cambio combinado de las tres métricas. */
export function trend(pre, post) {
  const a = summarize(pre)
  const b = summarize(post)
  const delta =
    (b.level - a.level) / 5 + (b.statementsAvg - a.statementsAvg) / 5 + (b.situationsAvg - a.situationsAvg) / 4
  if (delta > 0.05) return 'up'
  if (delta < -0.05) return 'down'
  return 'same'
}
