import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { createInitialState } from './initialState'
import { loadState, saveState } from './persistence'

/** Asignación inmutable por ruta: setIn(obj, ['a', 'b'], 1) */
function setIn(obj, [key, ...rest], value) {
  const base = Array.isArray(obj) ? [...obj] : { ...obj }
  base[key] = rest.length ? setIn(obj?.[key] ?? {}, rest, value) : value
  return base
}

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return setIn(state, action.path, action.value)
    case 'reset':
      return createInitialState()
    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, () => loadState() ?? createInitialState())

  useEffect(() => saveState(state), [state])

  const api = useMemo(
    () => ({
      set: (path, value) => dispatch({ type: 'set', path, value }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  )

  return <StoreContext.Provider value={{ state, ...api }}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
