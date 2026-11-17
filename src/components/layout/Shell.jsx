import { UI } from '../../content'
import { SCENE_BY_MODULE } from '../../lib/scenery'
import { Button } from '../ui/Button'
import { Pill } from '../ui/Pill'
import { Cloud } from '../scenery/Cloud'
import { FlowBackdrop } from '../scenery/FlowBackdrop'
import { SceneryBand } from '../scenery/SceneryBand'
import { SiteHeader } from '../site/SiteHeader'
import { ProgressHeader } from './ProgressHeader'
import { ResetLink } from './ResetLink'
import { SupportNote } from './SupportNote'

/**
 * Marco de cada paso del recorrido, bajo la barra del sitio.
 * - Celular: una columna; el dock de vidrio se queda pegado abajo y el paisaje va al pie (step.scenery).
 * - lg: contenedor centrado; cada pantalla se acomoda en dos columnas (ver Split). Si no cabe, se desplaza
 *   la página y la franja de vidrio (apoyo + botones) queda fija abajo. Al final, el paisaje con los números.
 */
export function Shell({ step, fractionByModule, numerals, canBack, canNext, nextLabel, onBack, onNext, onReset, children }) {
  const scene = SCENE_BY_MODULE[step.module]
  return (
    <div className="relative flex min-h-dvh flex-col">
      <FlowBackdrop scene={scene} numerals={numerals} />
      <SiteHeader cta={false} />

      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col overflow-x-clip px-5 pt-2 lg:max-w-[60rem] lg:overflow-x-visible">
        <Cloud key={scene} scene={scene} width={150} className="drift absolute top-14 -right-8 opacity-90 lg:hidden" />
        <ProgressHeader moduleId={step.module} fractionByModule={fractionByModule} />

        <main
          id="contenido"
          tabIndex={-1}
          key={step.id}
          className="outline-none screen-in relative flex flex-1 flex-col gap-7 pt-9 pb-8 lg:pt-12"
        >
          {step.required && <Pill className="-mb-3 gap-1.5 text-xs">{UI.required}</Pill>}
          {children}
        </main>

        {step.scenery && <SceneryBand key={`${step.scenery}-${scene}`} kind={step.scenery} scene={scene} />}

        {/* Celular: dock y luego el pie. lg: una sola franja de vidrio, pie a la izquierda y botones a la derecha. */}
        <div className="flex flex-col lg:glass lg:sticky lg:bottom-4 lg:z-10 lg:flex-row-reverse lg:items-center lg:gap-8 lg:rounded-[2rem] lg:p-2 lg:pl-6">
          {!step.final && (
            <nav className="sticky bottom-0 z-10 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:static lg:w-80 lg:shrink-0 lg:p-0">
              <div className="flex items-center gap-2 rounded-[1.9rem] max-lg:glass max-lg:p-2">
                {canBack && (
                  <Button variant="secondary" size="icon" onClick={onBack} aria-label={UI.back}>
                    <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                      <path
                        d="M12.5 4.5L7 10l5.5 5.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                )}
                <Button onClick={onNext} disabled={!canNext} className="flex-1">
                  {nextLabel}
                </Button>
              </div>
            </nav>
          )}
          <footer
            className={`flex shrink-0 flex-col gap-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:min-w-0 lg:flex-1 lg:flex-row lg:items-center lg:gap-6 lg:py-2 lg:text-sm ${
              step.scenery && step.final ? 'mt-24 lg:mt-0' : ''
            }`}
          >
            <SupportNote />
            <div className="shrink-0">
              <ResetLink onReset={onReset} />
            </div>
          </footer>
        </div>
      </div>

      {/* Deja ver las montañas del fondo debajo de la franja */}
      <div aria-hidden className="hidden h-[21vh] shrink-0 lg:block" />
    </div>
  )
}
