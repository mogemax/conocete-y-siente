import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { TextField } from '../components/ui/TextField'
import { UI } from '../content'

/** Pantalla de solo texto (intros y cierres de módulo). */
export function TextScreen({ eyebrow, title, body, note = UI.autosave }) {
  return (
    <>
      <Heading eyebrow={eyebrow} title={title} body={body} />
      {note && <p className="text-sm text-ink-faint">{note}</p>}
    </>
  )
}

/** Pantalla con un campo de texto ligado a una ruta del estado. */
export function FieldScreen({ eyebrow, title, hint, placeholder, path, rows = 5 }) {
  const { state, set } = useStore()
  const value = path.reduce((obj, k) => obj?.[k], state) ?? ''
  return (
    <>
      <Heading eyebrow={eyebrow} title={title} />
      <TextField label={null} hint={hint} placeholder={placeholder} value={value} onChange={(v) => set(path, v)} rows={rows} aria-label={title} />
    </>
  )
}
