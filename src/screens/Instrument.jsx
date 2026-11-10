import { useStore } from '../state/store'
import { useAdvance } from '../flow/useAdvance'
import { Heading } from '../components/ui/Heading'
import { Choice } from '../components/ui/Choice'
import { Scale } from '../components/ui/Scale'
import { LEVEL_TONE } from '../components/ui/tones'
import { INSTRUMENT, LEVELS, SCALE, STATEMENTS, MEASUREMENT_SITUATIONS, levelByN } from '../content'
import { summarize } from '../lib/scoring'

export const levelOptions = LEVELS.map((l) => ({ key: l.n, badge: l.n, label: l.name, sub: l.card, tone: LEVEL_TONE[l.n] }))

export function LevelStep({ phase, next }) {
  const { state, set } = useStore()
  const advance = useAdvance(next)
  const value = state.measures[phase].level
  return (
    <>
      <Heading id="lvl" eyebrow={INSTRUMENT.phases[phase].eyebrow} title={INSTRUMENT.levelStep.title} body={INSTRUMENT.levelStep.body} />
      <Choice
        labelledBy="lvl"
        options={levelOptions}
        value={value}
        onChange={(n) => {
          set(['measures', phase, 'level'], n)
          advance(value == null)
        }}
      />
    </>
  )
}

export function StatementStep({ phase, index, next }) {
  const { state, set } = useStore()
  const advance = useAdvance(next, 360)
  const value = state.measures[phase].statements[index]
  return (
    <>
      <p className="text-sm font-bold tracking-wide text-clay uppercase">
        {INSTRUMENT.statementStep.counter(index + 1, STATEMENTS.length)}
      </p>
      <h1 id={`st-${index}`} className="text-[1.75rem] font-bold">
        {STATEMENTS[index]}
      </h1>
      <p className="-mt-3 text-ink-soft">{INSTRUMENT.statementStep.title}</p>
      <Scale
        labelledBy={`st-${index}`}
        value={value}
        min={SCALE.min}
        max={SCALE.max}
        onChange={(n) => {
          set(['measures', phase, 'statements', index], n)
          advance(value == null)
        }}
      />
    </>
  )
}

export function SituationStep({ phase, index, next }) {
  const { state, set } = useStore()
  const advance = useAdvance(next)
  const sit = MEASUREMENT_SITUATIONS[index]
  const value = state.measures[phase].situations[sit.id] ?? null
  const options = state.orders[phase][sit.id].map((i) => ({ key: sit.options[i].level, label: sit.options[i].text }))
  return (
    <>
      <p className="text-sm font-bold tracking-wide text-clay uppercase">
        {INSTRUMENT.situationStep.counter(index + 1, MEASUREMENT_SITUATIONS.length)}
      </p>
      <h1 id={`sit-${sit.id}`} className="text-[1.6rem] font-bold">
        {sit.text}
      </h1>
      <p className="-mt-3 text-ink-soft">{INSTRUMENT.situationStep.body}</p>
      <Choice
        labelledBy={`sit-${sit.id}`}
        options={options}
        value={value}
        onChange={(lvl) => {
          set(['measures', phase, 'situations', sit.id], lvl)
          advance(value == null)
        }}
      />
    </>
  )
}

export function ResultStep({ phase }) {
  const { state } = useStore()
  const s = summarize(state.measures[phase])
  const level = levelByN(s.level)
  const tone = LEVEL_TONE[s.level]
  const t = INSTRUMENT.result
  return (
    <>
      <Heading eyebrow={INSTRUMENT.phases[phase].eyebrow} title={INSTRUMENT.phases[phase].resultTitle} />
      {level && (
        <section className={`flex flex-col gap-2 rounded-3xl p-6 ${tone.bg}`}>
          <p className={`text-sm font-bold ${tone.ink}`}>{t.level}</p>
          <p className={`font-display text-4xl font-black ${tone.ink}`}>
            {level.n} · {level.name}
          </p>
          <p className="text-ink">{level.card}</p>
        </section>
      )}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1">
        <dt className="text-sm text-ink-soft">{t.statements}</dt>
        <dt className="text-sm text-ink-soft">{t.situations}</dt>
        <dd className="font-display text-3xl font-bold tabular-nums">
          {s.statementsAvg}
          <span className="text-lg text-ink-faint"> / 5</span>
        </dd>
        <dd className="font-display text-3xl font-bold tabular-nums">
          {s.situationsAvg}
          <span className="text-lg text-ink-faint"> / 4</span>
        </dd>
      </dl>
      <p className="text-ink-soft">{phase === 'pre' ? t.preNote : t.postNote}</p>
    </>
  )
}
