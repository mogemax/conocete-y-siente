import { MEASUREMENT_SITUATIONS, STATEMENTS, M4 } from '../content'
import { shuffledOrders } from '../lib/shuffle'

// Súbelo si cambia la forma del estado: el progreso viejo se descarta en lugar de romper la app.
export const STATE_VERSION = 1

const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

const emptyMeasure = () => ({ level: null, statements: STATEMENTS.map(() => null), situations: {} })

const gameSituations = () => M4.game.rounds.flatMap((r) => [{ ...r.a, id: `${r.id}a` }, { ...r.b, id: `${r.id}b` }])

export function createInitialState() {
  return {
    version: STATE_VERSION,
    id: newId(),
    stepId: null, // null = primer paso
    furthest: 0, // índice del paso más lejano alcanzado
    consent: false,
    participant: null,
    checkin: { emotion: null, other: '', like: '' },
    measures: { pre: emptyMeasure(), post: emptyMeasure() },
    // El orden aleatorio se fija una vez y se guarda, para que no cambie al volver.
    orders: {
      pre: shuffledOrders(MEASUREMENT_SITUATIONS),
      post: shuffledOrders(MEASUREMENT_SITUATIONS),
      game: shuffledOrders(gameSituations()),
    },
    quiz: {},
    map: {},
    values: [],
    valueOther: '',
    strengthen: null,
    game: {}, // { r1: { a: nivel, b: nivel } }
    model: { id: null, learned: '' },
    area: '',
    ifThen: { when: '', then: '' },
    plan: null, // null = usar sugerencias del nivel
    name: '',
    survey: { usefulness: null, learned: '', different: '', improve: '' },
    sent: { result: false, opinion: false },
  }
}
