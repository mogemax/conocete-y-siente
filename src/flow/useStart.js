import { SITE } from '../content'
import { useStore } from '../state/store'
import { openPage } from './pages'
import { STEPS, indexOfStep } from './steps'

/** Botón principal del sitio: "Empezar" o "Continuar donde te quedaste", y a qué paso lleva. */
export function useStart() {
  const { state } = useStore()
  const started = state.stepId != null
  return {
    label: started ? SITE.resume : SITE.start,
    start: () => openPage(STEPS[Math.max(indexOfStep(state.stepId), 0)].id),
  }
}
