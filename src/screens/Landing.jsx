import { useStart } from '../flow/useStart'
import { SiteLayout } from '../components/site/SiteLayout'
import { QuoteGrid, Section, SectionTitle, TextBlock } from '../components/site/Section'
import { Cloud } from '../components/scenery/Cloud'
import { GlassTiles } from '../components/scenery/GlassTiles'
import { WideLandscape } from '../components/scenery/WideLandscape'
import { Accent } from '../components/ui/Accent'
import { Button } from '../components/ui/Button'
import { Pill } from '../components/ui/Pill'
import { LevelPath } from '../components/blocks/LevelPath'
import { LANDING, MODULES, UI } from '../content'

/** Inicio: portada a pantalla completa (amanecer) → propósito, camino, módulos, testimonios → cierre (atardecer). */
export function Landing() {
  const t = LANDING
  const { label, start } = useStart()

  return (
    <SiteLayout current="">
      {/* Portada: el título vive en el cielo y el paisaje ocupa la parte baja */}
      <section className="relative flex min-h-[min(calc(100svh-4rem),58rem)] flex-col">
        <Cloud scene="amanecer" width={240} className="drift absolute top-[8%] right-[6%] hidden md:block" />
        <Cloud
          scene="amanecer"
          width={130}
          className="drift absolute top-[42%] right-[30%] hidden opacity-80 lg:block [animation-delay:-4s]"
        />
        <div className="site-container flex flex-col gap-6 pt-8 pb-10 lg:pt-16">
          <Pill className="w-fit">{t.hero.eyebrow}</Pill>
          <h1 className="text-[clamp(3.25rem,10vw,8rem)] leading-[0.92] text-ink">
            <Accent text={t.hero.title} />
          </h1>
          <p className="max-w-[46ch] text-lg text-ink-soft lg:text-xl">{t.hero.body}</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={start}>{label}</Button>
            <a
              href="#/camino"
              className="inline-flex min-h-14 items-center rounded-full px-7 text-lg font-semibold text-ink ring-1 ring-line [font-stretch:110%] hover:ring-ink-faint"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
        <WideLandscape scene="amanecer" className="mt-auto h-[clamp(15rem,40vh,28rem)]">
          <GlassTiles
            tiles={[
              ['left', '6%', '62%'],
              ['left', 'calc(6% + 52px)', '48%'],
              ['right', '8%', '56%'],
              ['right', 'calc(8% + 52px)', '42%'],
            ]}
          />
        </WideLandscape>
      </section>

      <Section className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <SectionTitle title={t.purpose.title} />
        <p className="max-w-[60ch] text-lg text-ink-soft lg:pt-3 lg:text-xl">{t.purpose.body}</p>
      </Section>

      <Section className="grid items-center gap-8 border-t border-line lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <SectionTitle title={t.path.title} />
          <p className="max-w-[52ch] text-lg text-ink-soft">{t.path.body}</p>
          <a href="#/camino" className="w-fit font-semibold text-accent underline decoration-accent/40 underline-offset-4">
            {t.path.cta} →
          </a>
        </div>
        <div className="mx-auto w-full max-w-xl">
          <LevelPath />
        </div>
      </Section>

      <Section className="flex flex-col gap-10 border-t border-line">
        <SectionTitle title={t.modules.title} />
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {MODULES.map((m) => (
            <li key={m.id} className="flex flex-col gap-3">
              <span
                aria-hidden
                className="font-display text-[5.5rem] leading-[0.8] font-semibold tracking-[-0.06em] text-lime [font-stretch:120%]"
              >
                {m.n}
              </span>
              <p className="flex flex-wrap items-center gap-2">
                <span className="sr-only">Módulo {m.n}:</span>
                <span className="font-display text-xl font-semibold">{m.title}</span>
                <Pill tone="outline" className="min-h-6 px-2.5 py-0 text-xs">
                  {UI.minutes(m.minutes)}
                </Pill>
              </p>
              <p className="text-ink-soft">{t.modules.lines[m.id]}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-ink-faint">{t.modules.note}</p>
      </Section>

      <Section className="flex flex-col gap-10 border-t border-line">
        <SectionTitle title={t.testimonials.title} />
        <QuoteGrid />
      </Section>

      <Section className="grid gap-5 pt-0 md:grid-cols-2 lg:pt-0">
        <TextBlock {...t.takeaways} className="bg-accent-soft" />
        <TextBlock {...t.privacy} className="bg-card ring-1 ring-line" />
      </Section>

      {/* Cierre: el recorrido termina al atardecer */}
      <WideLandscape scene="atardecer" className="flex h-[clamp(26rem,60vh,36rem)] items-start">
        <div className="site-container pt-10">
          <div className="glass flex max-w-xl flex-col gap-4 rounded-[2rem] p-7 lg:p-9">
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-ink">
              <Accent text={t.closing.title} />
            </h2>
            <p className="text-lg text-ink-soft">{t.closing.body}</p>
            <Button onClick={start} className="w-fit">
              {label}
            </Button>
          </div>
        </div>
      </WideLandscape>
    </SiteLayout>
  )
}
