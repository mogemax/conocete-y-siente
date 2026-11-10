import { UI } from '../../content'
import { SCENE_BY_MODULE } from '../../lib/scenery'
import { Button } from '../ui/Button'
import { Pill } from '../ui/Pill'
import { Cloud } from '../scenery/Cloud'
import { SceneryBand } from '../scenery/SceneryBand'
import { ProgressHeader } from './ProgressHeader'
import { ResetLink } from './ResetLink'
import { SupportNote } from './SupportNote'

/**
 * Marco de cada pantalla: progreso arriba, contenido, paisaje opcional (step.scenery)
 * y la navegación en un dock de vidrio al alcance del pulgar.
 */
export function Shell({ step, fractionByModule, canBack, canNext, nextLabel, onBack, onNext, onReset, children }) {
  const scene = SCENE_BY_MODULE[step.module]
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-xl flex-col overflow-x-clip px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <Cloud key={scene} scene={scene} width={150} className="drift absolute top-20 -right-8 opacity-90" />
      <ProgressHeader moduleId={step.module} fractionByModule={fractionByModule} />

      <main key={step.id} className="screen-in relative flex flex-1 flex-col gap-7 pt-9 pb-8">
        {step.required && <Pill className="-mb-3 gap-1.5 text-xs">{UI.required}</Pill>}
        {children}
      </main>

      {step.scenery && <SceneryBand key={`${step.scenery}-${scene}`} kind={step.scenery} scene={scene} />}

      {!step.final && (
        <nav className="sticky bottom-0 z-10 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
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

      <footer className={`flex flex-col gap-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] ${step.scenery && step.final ? 'mt-24' : ''}`}>
        <SupportNote />
        <ResetLink onReset={onReset} />
      </footer>
    </div>
  )
}
