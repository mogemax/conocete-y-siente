import { useCallback, useEffect } from 'react'
import { useStore } from '../state/store'
import { STEPS, indexOfStep } from './steps'

const stepFromHash = () => decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))

/**
 * Navegación lineal entre pasos, sincronizada con el hash de la URL
 * para que el botón "atrás" del celular regrese una pantalla en lugar de salir del sitio.
 * Solo se puede saltar a pasos ya alcanzados (furthest).
 */
export function useNavigation() {
  const { state, set } = useStore()
  const found = indexOfStep(state.stepId)
  const index = found === -1 ? 0 : found

  const goto = useCallback(
    (id) => {
      const target = indexOfStep(id)
      if (target === -1) return
      set(['stepId'], id)
      if (target > state.furthest) set(['furthest'], target)
    },
    [set, state.furthest],
  )

  const next = useCallback(() => {
    const target = STEPS[index + 1]
    if (target) goto(target.id)
  }, [goto, index])

  // Al retomar en otra visita no hay historial previo: el botón "atrás" de la app navega por pasos,
  // no con history.back(), para no sacar a la persona del sitio.
  const back = useCallback(() => {
    if (index > 0) set(['stepId'], STEPS[index - 1].id)
  }, [index, set])

  // Estado → URL
  useEffect(() => {
    const id = STEPS[index].id
    if (stepFromHash() === id) return
    const url = `#/${id}`
    if (!window.location.hash) window.history.replaceState(null, '', url)
    else window.history.pushState(null, '', url)
    window.scrollTo({ top: 0 })
  }, [index])

  // URL → estado (botón atrás/adelante del navegador)
  useEffect(() => {
    const onPop = () => {
      const target = indexOfStep(stepFromHash())
      if (target !== -1 && target <= state.furthest) set(['stepId'], STEPS[target].id)
      else window.history.replaceState(null, '', `#/${STEPS[index].id}`)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [index, set, state.furthest])

  return { index, step: STEPS[index], next, back, goto }
}

/** Fracción completada de cada módulo según el paso actual (para la barra de progreso). */
export function moduleFractions(index) {
  const totals = {}
  const done = {}
  STEPS.forEach((s, i) => {
    totals[s.module] = (totals[s.module] ?? 0) + 1
    if (i < index) done[s.module] = (done[s.module] ?? 0) + 1
  })
  return Object.fromEntries(Object.keys(totals).map((m) => [m, (done[m] ?? 0) / totals[m]]))
}
