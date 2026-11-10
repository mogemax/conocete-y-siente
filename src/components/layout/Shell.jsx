import { useState } from 'react'
import { UI } from '../../content'
import { SCENE_BY_MODULE } from '../../lib/scenery'
import { Button } from '../ui/Button'
import { Pill } from '../ui/Pill'
import { Cloud } from '../scenery/Cloud'
import { SceneryBand } from '../scenery/SceneryBand'
import { DesktopBackdrop } from '../scenery/DesktopBackdrop'
import { ProgressHeader } from './ProgressHeader'
import { ResetLink } from './ResetLink'
import { SidePanelSlot } from './SidePanel'
import { SupportNote } from './SupportNote'

/**
 * Marco de cada pantalla: progreso arriba, contenido, paisaje opcional (step.scenery)
 * y la navegación en un dock de vidrio al alcance del pulgar.
 * - Celular: la página se desplaza y el dock se queda pegado abajo.
 * - lg: la columna es una tarjeta y el paisaje pasa al fondo de la ventana.
 * - desk (lg con altura suficiente, ver index.css): la tarjeta mide lo que la ventana; solo el contenido
 *   se desplaza y el dock y el pie quedan fijos al fondo de la tarjeta.
 * - xl: la retro (SidePanel) sale en un panel a la derecha de la tarjeta.
 */
export function Shell({ step, fractionByModule, canBack, canNext, nextLabel, onBack, onNext, onReset, children }) {
  const scene = SCENE_BY_MODULE[step.module]
  const [slot, setSlot] = useState(null)
  return (
    <SidePanelSlot value={slot}>
      <div className="relative mx-auto flex min-h-dvh w-full max-w-xl flex-col overflow-x-clip px-5 pt-[max(1.25rem,env(safe-area-inset-top))] lg:my-10 lg:min-h-[calc(100dvh-5rem)] desk:h-[calc(100dvh-5rem)] lg:rounded-[2.5rem] lg:bg-paper lg:pt-7 lg:shadow-[0_30px_80px_-30px_oklch(0.3_0.06_125/0.55)]">
        <DesktopBackdrop key={`fondo-${scene}`} scene={scene} />
        <Cloud key={scene} scene={scene} width={150} className="drift absolute top-20 -right-8 opacity-90 lg:hidden" />
        <ProgressHeader moduleId={step.module} fractionByModule={fractionByModule} />

        <main
          key={step.id}
          className="screen-in relative flex flex-1 flex-col gap-7 pt-9 pb-8 desk:-mx-5 desk:min-h-0 desk:overflow-y-auto desk:overscroll-contain desk:px-5 desk:[mask-image:linear-gradient(to_bottom,#000_calc(100%-2rem),transparent)]"
        >
          {step.required && <Pill className="-mb-3 gap-1.5 text-xs">{UI.required}</Pill>}
          {children}
        </main>

        {step.scenery && <SceneryBand key={`${step.scenery}-${scene}`} kind={step.scenery} scene={scene} />}

        {!step.final && (
          <nav className="sticky bottom-0 z-10 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] desk:static desk:pb-0">
            <div className="glass flex items-center gap-2 rounded-[1.9rem] p-2">
              {canBack && (
                <Button variant="secondary" size="icon" onClick={onBack} aria-label={UI.back}>
                  <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                    <path d="M12.5 4.5L7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              )}
              <Button onClick={onNext} disabled={!canNext} className="flex-1">
                {nextLabel}
              </Button>
            </div>
          </nav>
        )}

        <footer className={`flex shrink-0 flex-col gap-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] ${step.scenery && step.final ? 'mt-24 lg:mt-0' : ''}`}>
          <SupportNote />
          <ResetLink onReset={onReset} />
        </footer>
      </div>

      {/* Fuera de la tarjeta (que recorta lo que se sale); alineado a su borde derecho. */}
      <aside
        ref={setSlot}
        className="fixed top-10 left-[calc(50%+19.5rem)] hidden max-h-[calc(100dvh-5rem)] w-[min(24rem,calc(50vw-21rem))] overflow-y-auto xl:block"
      />
    </SidePanelSlot>
  )
}
