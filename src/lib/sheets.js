import { MEASUREMENT_SITUATIONS, M4 } from '../content'
import { summarize } from './scoring'

const SHEETS_URL = import.meta.env.VITE_SHEETS_URL
export const RECORD_VERSION = 1

/**
 * Envía un registro al Web App de Google Apps Script.
 * Modo no-cors: no hay respuesta legible, solo sabemos si la red falló.
 * El body es texto plano (JSON) para evitar el preflight de CORS.
 */
export async function sendRecord(record) {
  if (!SHEETS_URL) return true // sin URL configurada: la app funciona igual y no envía nada
  try {
    await fetch(SHEETS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(record) })
    return true
  } catch {
    return false
  }
}

function measureColumns(prefix, measure) {
  const s = summarize(measure)
  const cols = { [`${prefix}_nivel`]: measure.level }
  measure.statements.forEach((v, i) => (cols[`${prefix}_a${i + 1}`] = v))
  MEASUREMENT_SITUATIONS.forEach((sit) => (cols[`${prefix}_${sit.id}`] = measure.situations[sit.id] ?? null))
  cols[`${prefix}_prom_afirmaciones`] = s.statementsAvg
  cols[`${prefix}_prom_situaciones`] = s.situationsAvg
  cols[`${prefix}_aciertos`] = s.hits
  return cols
}

/** Registro ANÓNIMO de resultados: sin nombres ni textos libres. */
export function buildResultRecord(state, completed) {
  const game = {}
  M4.game.rounds.forEach((r, i) => {
    game[`juego_r${i + 1}_intento1`] = state.game[r.id]?.a ?? null
    game[`juego_r${i + 1}_intento2`] = state.game[r.id]?.b ?? null
  })
  return {
    hoja: 'resultados',
    id: state.id,
    fecha: new Date().toISOString(),
    version: RECORD_VERSION,
    participante: state.participant,
    ...measureColumns('antes', state.measures.pre),
    ...measureColumns('despues', state.measures.post),
    ...game,
    completo: completed,
  }
}

/** Encuesta de opinión (opcional), mismo id que el registro de resultados. */
export function buildOpinionRecord(state) {
  const { usefulness, learned, different, improve } = state.survey
  return {
    hoja: 'opinion',
    id: state.id,
    fecha: new Date().toISOString(),
    version: RECORD_VERSION,
    participante: state.participant,
    utilidad: usefulness,
    que_aprendiste: learned.trim(),
    que_haras_distinto: different.trim(),
    que_mejorarias: improve.trim(),
  }
}
