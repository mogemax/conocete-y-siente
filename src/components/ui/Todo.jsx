import { SHOW_TODOS, UI } from '../../content'

/** Etiqueta visible para contenido pendiente del equipo (se apaga con SHOW_TODOS). */
export function Todo({ children }) {
  if (!SHOW_TODOS || !children) return null
  return (
    <p className="rounded-xl border border-dashed border-clay/50 bg-clay-soft/50 px-3 py-2 text-sm text-clay-deep">
      <strong className="font-bold">{UI.todoLabel}:</strong> {children}
    </p>
  )
}
