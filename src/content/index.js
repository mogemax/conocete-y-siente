// Punto único de entrada al contenido. Para editar textos, abre el archivo del módulo correspondiente.

export { SHOW_TODOS, UI, SUPPORT, RESET } from './ui.js'
export { LEVELS, TARGET_LEVEL, levelByN, PLAN_SUGGESTIONS } from './levels.js'
export { INSTRUMENT, SCALE, STATEMENTS, MEASUREMENT_SITUATIONS } from './instrument.js'
export { M1 } from './m1.js'
export { M2 } from './m2.js'
export { M3 } from './m3.js'
export { M4 } from './m4.js'
export { M5 } from './m5.js'

export const MODULES = [
  { id: 'm1', n: 1, title: 'Enganche', minutes: 5 },
  { id: 'm2', n: 2, title: 'Qué es', minutes: 10 },
  { id: 'm3', n: 3, title: 'Identifícala', minutes: 10 },
  { id: 'm4', n: 4, title: 'Desarróllala jugando', minutes: 25 },
  { id: 'm5', n: 5, title: 'Mide y comprométete', minutes: 10 },
]
