import { SHOW_TODOS, UI } from '../../content'

/** Etiqueta visible para contenido pendiente del equipo (se apaga con SHOW_TODOS). */
export function Todo({ children }) {
  if (!SHOW_TODOS || !children) return null
  return (
    <p className="rounded-xl border border-dashed border-accent/50 bg-accent-soft/50 px-3 py-2 text-sm text-accent-deep">
      <strong className="font-semibold">{UI.todoLabel}:</strong> {children}
    </p>
  )
}
