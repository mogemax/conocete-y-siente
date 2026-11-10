import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { Pill } from '../components/ui/Pill'
import { Choice } from '../components/ui/Choice'
import { TextField } from '../components/ui/TextField'
import { Todo } from '../components/ui/Todo'
import { LevelTicket } from '../components/ui/LevelTicket'
import { Landscape } from '../components/scenery/Landscape'
import { Grain } from '../components/scenery/Grain'
import { SidePanel } from '../components/layout/SidePanel'
import { SwipeCards } from '../components/blocks/SwipeCards'
import { M4, TARGET_LEVEL, levelByN } from '../content'

const G = M4.game

/** Una ronda del juego: intento 'a' (situación original) o 'b' (situación gemela). */
export function GameStep({ roundIndex, attempt }) {
  const { state, set } = useStore()
  const round = G.rounds[roundIndex]
  const sit = round[attempt]
  const chosen = state.game[round.id]?.[attempt] ?? null
  const order = state.orders.game[`${round.id}${attempt}`]
  const options = order.map((i) => ({ key: sit.options[i].level, label: sit.options[i].text }))

  return (
    <>
      <div className="flex flex-col gap-3">
        <Pill>{G.counter(roundIndex + 1, attempt)}</Pill>
        {attempt === 'b' && <p className="font-semibold text-leaf-ink">{G.secondIntro}</p>}
        <Pill tone="outline">{sit.place}</Pill>
        <h1 id={`game-${round.id}${attempt}`} className="text-[1.75rem]">
          {sit.text}
        </h1>
      </div>
      <Choice
        labelledBy={`game-${round.id}${attempt}`}
        disabled={chosen != null}
        options={options}
        value={chosen}
        onChange={(lvl) => set(['game', round.id, attempt], lvl)}
      />
      {chosen != null && <Feedback level={chosen} sit={sit} first={attempt === 'b' ? state.game[round.id]?.a : null} />}
    </>
  )
}

function Feedback({ level, sit, first }) {
  const info = levelByN(level)
  return (
    <SidePanel>
      <section role="status" className="reveal relative -mx-5 px-4 pt-32 pb-6 lg:mx-0 lg:p-0">
        {/* En celular la retro va sobre su propio paisaje; en lg+ el paisaje ya está de fondo. */}
        <div aria-hidden className="absolute inset-0 overflow-hidden rounded-t-[2rem] lg:hidden">
          <Landscape scene="mediodia" lake={false} seed={7 + level * 5} className="absolute inset-0" />
          <Grain />
        </div>
        <div className="glass relative flex flex-col gap-4 rounded-[1.9rem] p-5">
          {first != null && <ProgressMessage first={first} second={level} />}
          <LevelTicket label={G.chosenLevel} n={level} name={info.name}>
            <p className="text-ink">{G.levelReading[level]}</p>
          </LevelTicket>
          <div className="flex flex-col gap-3 rounded-[1.25rem] bg-card p-4">
            <div>
              <p className="text-sm font-semibold text-leaf-ink">{G.level3Title}</p>
              <p className="font-semibold">{sit.level3}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-soft">{G.whyTitle}</p>
              <p className="text-ink">{sit.why}</p>
            </div>
          </div>
        </div>
      </section>
    </SidePanel>
  )
}

function ProgressMessage({ first, second }) {
  const kind = second > first ? 'up' : second >= TARGET_LEVEL ? 'kept' : 'same'
  const text = kind === 'up' ? G.progress.up(first, second) : kind === 'kept' ? G.progress.kept(second) : G.progress.same
  return <p className={`font-display text-2xl leading-tight font-medium ${kind === 'same' ? 'text-ink' : 'text-accent'}`}>{text}</p>
}

export function Models() {
  const { state, set } = useStore()
  const t = M4.models
  const chosen = t.people.find((p) => p.id === state.model.id)
  return (
    <>
      <Heading eyebrow={t.eyebrow} title={t.title} body={t.body} />
      <SwipeCards
        label="Personas modelo"
        items={t.people}
        renderItem={(p) => {
          const selected = p.id === state.model.id
          return (
            <article
              className={`flex h-full flex-col gap-3 rounded-3xl bg-card p-6 ring-1 transition-shadow ${selected ? 'ring-2 ring-accent' : 'ring-line'}`}
            >
              <p className="text-sm font-semibold text-leaf-ink">{p.tag}</p>
              <h2 className="text-2xl font-semibold">{p.name}</h2>
              <p className="text-[0.98rem] text-ink-soft">{p.summary}</p>
              {p.sources.length > 0 ? (
                <p className="text-xs text-ink-faint">{p.sources.join(' · ')}</p>
              ) : (
                <Todo>{p.sourcesTodo}</Todo>
              )}
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => set(['model', 'id'], p.id)}
                className={`mt-auto min-h-12 rounded-2xl font-semibold ring-1 transition-colors ${
                  selected ? 'bg-accent text-card ring-accent' : 'bg-paper text-ink ring-line hover:ring-ink-faint'
                }`}
              >
                {selected ? t.chosen : t.choose}
              </button>
            </article>
          )
        }}
      />
      {chosen && (
        <div className="reveal flex flex-col gap-3">
          <p className="font-display text-lg font-semibold text-accent">{chosen.question}</p>
          <TextField
            label={t.learnTitle(chosen.name)}
            hint={t.learnHint}
            value={state.model.learned}
            onChange={(v) => set(['model', 'learned'], v)}
            rows={3}
          />
        </div>
      )}
    </>
  )
}

export function TestimonialList({ items, origin }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((quote, i) => (
        <li key={quote} className={`flex flex-col gap-2 rounded-3xl p-6 ${i % 2 ? 'ml-6 bg-l2' : 'mr-6 bg-l1'}`}>
          <p className="font-display text-xl leading-snug font-semibold">“{quote}”</p>
          <p className="text-sm text-ink-soft">{origin}</p>
        </li>
      ))}
    </ul>
  )
}

export function Testimonials() {
  const t = M4.testimonials
  return (
    <>
      <Heading eyebrow={t.eyebrow} title={t.title} />
      <TestimonialList items={t.items} origin={t.origin} />
      <p className="font-semibold text-leaf-ink">{t.closing}</p>
    </>
  )
}
