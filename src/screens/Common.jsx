import { Split } from '../components/layout/Split'
import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { TextField } from '../components/ui/TextField'
import { Cite } from '../components/ui/Cite'
import { ModuleNumerals } from '../components/scenery/ModuleNumerals'
import { MODULES, UI } from '../content'

/** Portada de módulo: numeral gigante con sus vecinos (en lg lo dibuja FlowBackdrop), título con acento y recordatorio de guardado. */
export function ModuleIntro({ module, title, body }) {
  const m = MODULES.find((x) => x.id === module)
  return (
    <>
      <div className="lg:hidden">
        <ModuleNumerals n={m.n} />
      </div>
      {/* La columna derecha queda libre: ahí sale el número detrás de las montañas */}
      <Split
        context={
          <>
            <Heading title={title} body={body} />
            <p className="text-sm text-ink-faint">{UI.autosave}</p>
          </>
        }
      />
    </>
  )
}

/** Pantalla con un campo de texto ligado a una ruta del estado. */
export function FieldScreen({ eyebrow, title, hint, source, placeholder, path, rows = 5 }) {
  const { state, set } = useStore()
  const value = path.reduce((obj, k) => obj?.[k], state) ?? ''
  return (
    <Split context={<Heading eyebrow={eyebrow} title={title} />}>
      <TextField
        label={null}
        hint={hint}
        placeholder={placeholder}
        value={value}
        onChange={(v) => set(path, v)}
        rows={rows}
        aria-label={title}
      />
      <Cite sources={source} className="-mt-4" />
    </Split>
  )
}
