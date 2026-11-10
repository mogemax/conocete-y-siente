import { useEffect, useRef } from 'react'

/** Avanza solo tras una pausa breve, para que la persona vea su elección antes del cambio de pantalla. */
export function useAdvance(next, delay = 420) {
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  return (shouldAdvance = true) => {
    if (!shouldAdvance) return
    clearTimeout(timer.current)
    timer.current = setTimeout(next, delay)
  }
}
