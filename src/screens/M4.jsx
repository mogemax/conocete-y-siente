import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { Choice } from '../components/ui/Choice'
import { TextField } from '../components/ui/TextField'
import { Todo } from '../components/ui/Todo'
import { LEVEL_TONE } from '../components/ui/tones'
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
        <p className="text-sm font-bold tracking-wide text-clay uppercase">{G.counter(roundIndex + 1, attempt)}</p>
        {attempt === 'b' && <p className="font-bold text-sage-ink">{G.secondIntro}</p>}
        <p className="w-fit rounded-full bg-paper-deep px-3 py-1 text-sm font-bold text-ink-soft">{sit.place}</p>
        <h1 id={`game-${round.id}${attempt}`} className="text-[1.6rem] font-bold">
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
  const tone = LEVEL_TONE[level]
  return (
    <section role="status" className="reveal flex flex-col gap-4">
      {first != null && <ProgressMessage first={first} second={level} />}
      <div className={`flex flex-col gap-1 rounded-2xl p-5 ${tone.bg}`}>
        <p className={`font-display text-lg font-bold ${tone.ink}`}>{G.chosenLevel(level, info.name)}</p>
        <p>{G.levelReading[level]}</p>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 ring-1 ring-line">
        <div>
          <p className="text-sm font-bold text-l3-ink">{G.level3Title}</p>
          <p className="font-bold">{sit.level3}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-ink-soft">{G.whyTitle}</p>
          <p className="text-ink-soft">{sit.why}</p>
        </div>
      </div>
    </section>
  )
}

function ProgressMessage({ first, second }) {
  const kind = second > first ? 'up' : second >= TARGET_LEVEL ? 'kept' : 'same'
  const text = kind === 'up' ? G.progress.up(first, second) : kind === 'kept' ? G.progress.kept(second) : G.progress.same
  return (
    <p className={`rounded-2xl p-4 font-display text-lg font-bold ${kind === 'same' ? 'bg-paper-deep text-ink' : 'bg-sage text-card'}`}>
      {text}
    </p>
  )
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
              className={`flex h-full flex-col gap-3 rounded-3xl bg-card p-6 ring-1 transition-shadow ${selected ? 'ring-2 ring-clay' : 'ring-line'}`}
            >
              <p className="text-sm font-bold text-sage-ink">{p.tag}</p>
              <h2 className="text-2xl font-bold">{p.name}</h2>
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
                className={`mt-auto min-h-12 rounded-2xl font-bold ring-1 transition-colors ${
                  selected ? 'bg-clay text-card ring-clay' : 'bg-paper text-ink ring-line hover:ring-ink-faint'
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
          <p className="font-display text-lg font-bold text-clay">{chosen.question}</p>
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
          <p className="font-display text-xl leading-snug font-bold">“{quote}”</p>
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
      <p className="font-bold text-sage-ink">{t.closing}</p>
    </>
  )
}
