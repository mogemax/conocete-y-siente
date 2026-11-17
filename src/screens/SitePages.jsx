import { useStart } from '../flow/useStart'
import { SiteLayout } from '../components/site/SiteLayout'
import { QuoteGrid, Section, SectionTitle, TextBlock } from '../components/site/Section'
import { Accent } from '../components/ui/Accent'
import { Button } from '../components/ui/Button'
import { Cite } from '../components/ui/Cite'
import { LEVEL_TONE } from '../components/ui/tones'
import { LevelPath } from '../components/blocks/LevelPath'
import { CAMINO, HISTORIAS, LEVELS, M4, NOSOTROS, SUPPORT, TARGET_LEVEL } from '../content'

/** Encabezado de página: pastilla, título grande y bajada. */
function PageIntro({ eyebrow, title, body }) {
  return (
    <Section className="flex flex-col gap-6 pb-8 lg:pb-12">
      <SectionTitle eyebrow={eyebrow} title={title} as="h1" />
      <p className="max-w-[58ch] text-lg text-ink-soft lg:text-xl">{body}</p>
    </Section>
  )
}

export function Camino() {
  const t = CAMINO
  return (
    <SiteLayout current="camino">
      <PageIntro {...t} />
      <Section className="pt-0 lg:pt-0">
        <div className="mx-auto max-w-2xl">
          <LevelPath />
        </div>
      </Section>
      <Section className="pt-0 lg:pt-0">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LEVELS.map((l) => (
            <li
              key={l.n}
              className={`flex flex-col gap-3 rounded-[1.75rem] p-6 ${LEVEL_TONE[l.n].bg} ${l.n === TARGET_LEVEL ? 'ring-2 ring-accent' : ''}`}
            >
              <span className={`font-display text-6xl leading-[0.8] font-semibold tracking-[-0.05em] ${LEVEL_TONE[l.n].ink}`}>{l.n}</span>
              <p className={`font-display text-xl font-semibold ${LEVEL_TONE[l.n].ink}`}>{l.name}</p>
              <p className="text-ink">{l.card}</p>
              <p className="mt-auto border-t-2 border-dashed border-card/80 pt-3 text-sm text-ink-soft">
                <span className="font-semibold text-ink">{t.tipLabel}:</span> {l.tip}
              </p>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="grid gap-5 pt-0 md:grid-cols-2 lg:pt-0">
        <TextBlock {...t.goal} className="bg-accent-soft" />
        <TextBlock {...t.measure} className="bg-card ring-1 ring-line" />
      </Section>
      <StartBand />
    </SiteLayout>
  )
}

export function Historias() {
  const t = HISTORIAS
  return (
    <SiteLayout current="historias">
      <PageIntro {...t} />
      {/* Solo una probadita: nombre, de qué trata y la pregunta. La historia completa está en el Módulo 4. */}
      <Section className="pt-0 lg:pt-0">
        <ul className="grid gap-5 md:grid-cols-3">
          {M4.models.people.map((p, i) => (
            <li key={p.id} className="flex flex-col gap-4 rounded-[2rem] bg-card p-8 ring-1 ring-line">
              <span aria-hidden className="font-display text-5xl leading-[0.8] font-semibold text-lime">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-semibold text-leaf-ink">{p.tag}</p>
              <h2 className="text-3xl text-ink">{p.name}</h2>
              <p className="text-ink-soft italic">{p.question}</p>
              <Cite sources={p.sources} className="mt-auto text-xs" />
            </li>
          ))}
        </ul>
      </Section>
      <Section className="flex flex-col gap-8 border-t border-line">
        <SectionTitle title={t.testimonialsTitle} />
        <QuoteGrid />
      </Section>
      <StartBand label={t.cta} />
    </SiteLayout>
  )
}

export function Nosotros() {
  const t = NOSOTROS
  return (
    <SiteLayout current="nosotros">
      <PageIntro {...t} />
      <Section className="grid gap-5 pt-0 md:grid-cols-2 lg:pt-0">
        <div className="flex flex-col gap-5 rounded-[2rem] bg-accent-soft p-8 lg:p-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] text-ink">{t.teamTitle}</h2>
          <ul className="flex flex-col gap-2 font-display text-2xl">
            {t.team.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 rounded-[2rem] bg-card p-8 ring-1 ring-line lg:p-10">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] text-ink">
            <Accent text={t.supportTitle} />
          </h2>
          <p className="text-lg text-ink-soft">{SUPPORT.body}</p>
          {SUPPORT.contact && <p className="font-semibold">{SUPPORT.contact}</p>}
        </div>
      </Section>
      <Section className="flex flex-col gap-4 border-t border-line">
        <SectionTitle title={t.referencesTitle} />
        <p className="text-lg text-ink-soft">{t.referencesBody}</p>
        <a href="#/referencias" className="w-fit font-semibold text-accent underline decoration-accent/40 underline-offset-4">
          {t.referencesCta} →
        </a>
      </Section>
    </SiteLayout>
  )
}

/** Banda final con el botón principal. */
function StartBand({ label }) {
  const { label: startLabel, start } = useStart()
  return (
    <Section className="border-t border-line">
      <Button onClick={start}>{label ?? startLabel}</Button>
    </Section>
  )
}
