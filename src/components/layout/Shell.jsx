import { UI } from '../../content'
import { Button } from '../ui/Button'
import { ProgressHeader } from './ProgressHeader'
import { ResetLink } from './ResetLink'
import { SupportNote } from './SupportNote'

/** Marco de cada pantalla: progreso arriba, contenido, navegación al alcance del pulgar y pie de apoyo. */
export function Shell({ step, fractionByModule, canBack, canNext, nextLabel, onBack, onNext, onReset, children }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <ProgressHeader moduleId={step.module} fractionByModule={fractionByModule} />

      <main key={step.id} className="screen-in flex flex-1 flex-col gap-7 pt-9 pb-8">
        {step.required && (
          <p className="-mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-clay-soft px-3 py-1 text-xs font-bold text-clay-deep">
            <span aria-hidden className="size-1.5 rounded-full bg-clay" />
            {UI.required}
          </p>
        )}
        {children}
      </main>

      {!step.final && (
        <nav className="sticky bottom-0 -mx-5 flex items-center gap-3 bg-paper/90 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
          {canBack && (
            <Button variant="secondary" onClick={onBack} aria-label={UI.back} className="w-14 shrink-0 px-0">
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                <path d="M12.5 4.5L7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          )}
          <Button onClick={onNext} disabled={!canNext} className="flex-1">
            {nextLabel}
          </Button>
        </nav>
      )}

      <footer className="flex flex-col gap-4 border-t border-line pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <SupportNote />
        <ResetLink onReset={onReset} />
      </footer>
    </div>
  )
}
