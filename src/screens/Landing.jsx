import { useState } from 'react'
import { useStore } from '../state/store'
import { openPage } from '../flow/pages'
import { STEPS, indexOfStep } from '../flow/steps'
import { PageFrame } from '../components/layout/PageFrame'
import { SupportNote } from '../components/layout/SupportNote'
import { SceneryBand } from '../components/scenery/SceneryBand'
import { Accent } from '../components/ui/Accent'
import { Button } from '../components/ui/Button'
import { Heading } from '../components/ui/Heading'
import { Pill } from '../components/ui/Pill'
import { LevelPath } from '../components/blocks/LevelPath'
import { TestimonialList } from './M4'
import { LANDING, M4, MODULES, UI } from '../content'

const SCENE = 'amanecer'

/** Sección de la landing: título con acento y contenido. */
function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-4 border-t border-line py-10">
      <h2 className="text-[1.875rem] text-ink">
        <Accent text={title} />
      </h2>
      {children}
    </section>
  )
}

/** Introducción: propósito, el camino de niveles, módulos y qué te llevas. El botón principal flota abajo. */
export function Landing() {
  const { state } = useStore()
  const [readFirst, setReadFirst] = useState(false)
  const t = LANDING
  const started = state.stepId != null
  const start = () => openPage(STEPS[Math.max(indexOfStep(state.stepId), 0)].id)

  return (
    <PageFrame scene={SCENE}>
      <main className="screen-in flex flex-col pt-6">
        <div className="flex flex-col gap-6 pb-8">
          <Heading eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} size="lg" />
          <button
            type="button"
            aria-expanded={readFirst}
            onClick={() => setReadFirst((v) => !v)}
            className="w-fit text-left font-semibold text-accent underline decoration-accent/40 underline-offset-4"
          >
            {t.hero.readFirst}
          </button>
          {readFirst && (
            <div className="reveal">
              <TestimonialList items={M4.testimonials.items} origin={M4.testimonials.origin} />
            </div>
          )}
        </div>

        <SceneryBand kind="hero" scene={SCENE} overlap={false} />

        <Section title={t.purpose.title}>
          <p className="text-ink-soft">{t.purpose.body}</p>
        </Section>

        <Section title={t.path.title}>
          <p className="text-ink-soft">{t.path.body}</p>
          <LevelPath />
        </Section>

        <Section title={t.modules.title}>
          <ol className="flex flex-col gap-5">
            {MODULES.map((m) => (
              <li key={m.id} className="grid grid-cols-[3.25rem_1fr] items-start gap-x-3">
                <span aria-hidden className="font-display text-[3.25rem] leading-[0.85] font-semibold tracking-[-0.05em] text-lime">
                  {m.n}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="sr-only">Módulo {m.n}:</span>
                    <span className="font-display text-lg font-semibold">{m.title}</span>
                    <Pill tone="outline" className="min-h-6 px-2.5 py-0 text-xs">
                      {UI.minutes(m.minutes)}
                    </Pill>
                  </p>
                  <p className="text-ink-soft">{t.modules.lines[m.id]}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-ink-faint">{t.modules.note}</p>
        </Section>

        <Section title={t.takeaways.title}>
          <p className="text-ink-soft">{t.takeaways.body}</p>
        </Section>

        <Section title={t.privacy.title}>
          <p className="text-ink-soft">{t.privacy.body}</p>
        </Section>
      </main>

      <nav className="sticky bottom-0 z-10 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:bottom-4">
        <div className="glass rounded-[1.9rem] p-2">
          <Button onClick={start} className="w-full">
            {started ? t.hero.resume : t.hero.start}
          </Button>
        </div>
      </nav>

      <footer className="flex flex-col gap-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-ink-soft">
        <p>{t.footer.course}</p>
        <p>{t.footer.team}</p>
        <button type="button" onClick={() => openPage('referencias')} className="w-fit font-semibold text-accent underline underline-offset-4">
          {t.footer.references}
        </button>
        <SupportNote />
      </footer>
    </PageFrame>
  )
}
