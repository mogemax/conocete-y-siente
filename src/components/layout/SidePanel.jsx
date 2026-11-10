import { createContext, useContext, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

// En pantallas xl (≥ 80rem) la retro sale a la derecha de la tarjeta; en las demás se queda en línea.
const WIDE = '(min-width: 80rem)'
const SlotContext = createContext(null)

/** Lo provee Shell con el nodo <aside> donde se monta la retro. */
export const SidePanelSlot = SlotContext.Provider

function subscribe(onChange) {
  const mq = window.matchMedia(WIDE)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

const useWide = () => useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => false)

/** Un solo render: en xl se porta al panel lateral, si no se queda donde está (no se duplica para lectores de pantalla). */
export function SidePanel({ children }) {
  const slot = useContext(SlotContext)
  const wide = useWide()
  return wide && slot ? createPortal(<div className="side-in">{children}</div>, slot) : children
}
