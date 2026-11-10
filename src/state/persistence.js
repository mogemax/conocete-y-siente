import { STATE_VERSION } from './initialState'

const KEY = 'conocete-y-siente'

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return saved?.version === STATE_VERSION ? saved : null
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* modo privado o almacenamiento lleno: la experiencia sigue sin guardar */
  }
}
