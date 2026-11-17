import { useSyncExternalStore } from 'react'

// Páginas fuera del recorrido. Cualquier otro hash (#/consentimiento, #/m2-intro…) es un paso del recorrido.
const PAGES = { '': 'inicio', camino: 'camino', historias: 'historias', nosotros: 'nosotros', referencias: 'referencias' }

export const hashId = () => decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))
export const pageOf = (id) => PAGES[id] ?? 'flow'

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  window.addEventListener('popstate', onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener('popstate', onChange)
  }
}

/** Página del sitio ('inicio', 'camino', …) o 'flow' para los pasos del recorrido, según el hash de la URL. */
export const usePage = () => useSyncExternalStore(subscribe, () => pageOf(hashId()), () => 'inicio')

/** Va a una página o paso (id del hash) recordando de dónde viene, para que "Volver" regrese ahí. */
export function openPage(id) {
  window.history.pushState({ from: hashId() }, '', `#/${id}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
  window.scrollTo({ top: 0 })
}

/** Regresa a donde estaba; si se entró directo por la liga, va a la landing. */
export function leavePage() {
  if (window.history.state && 'from' in window.history.state) window.history.back()
  else openPage('')
}
