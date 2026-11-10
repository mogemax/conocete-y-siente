import { useStore } from '../state/store'
import { useAdvance } from '../flow/useAdvance'
import { Heading } from '../components/ui/Heading'
import { Pill } from '../components/ui/Pill'
import { LevelTicket } from '../components/ui/LevelTicket'
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
      <Pill>
        {INSTRUMENT.statementStep.counter(index + 1, STATEMENTS.length)}
      </Pill>
      <h1 id={`st-${index}`} className="text-[1.75rem] font-semibold">
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
      <Pill>
        {INSTRUMENT.situationStep.counter(index + 1, MEASUREMENT_SITUATIONS.length)}
      </Pill>
      <h1 id={`sit-${sit.id}`} className="text-[1.6rem] font-semibold">
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
  const t = INSTRUMENT.result
  return (
    <>
      <Heading eyebrow={INSTRUMENT.phases[phase].eyebrow} title={INSTRUMENT.phases[phase].resultTitle} />
      {level && (
        <LevelTicket label={t.level} n={level.n} name={level.name}>
          <p className="text-ink">{level.card}</p>
        </LevelTicket>
      )}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1">
        <dt className="text-sm text-ink-soft">{t.statements}</dt>
        <dt className="text-sm text-ink-soft">{t.situations}</dt>
        <dd className="font-display text-3xl font-semibold tabular-nums">
          {s.statementsAvg}
          <span className="text-lg text-ink-faint"> / 5</span>
        </dd>
        <dd className="font-display text-3xl font-semibold tabular-nums">
          {s.situationsAvg}
          <span className="text-lg text-ink-faint"> / 4</span>
        </dd>
      </dl>
      <p className="text-ink-soft">{phase === 'pre' ? t.preNote : t.postNote}</p>
    </>
  )
}
