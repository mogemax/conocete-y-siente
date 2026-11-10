import { useState } from 'react'
import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { Choice } from '../components/ui/Choice'
import { TextField } from '../components/ui/TextField'
import { LEVEL_TONE } from '../components/ui/tones'
import { EmotionWheel } from '../components/blocks/EmotionWheel'
import { TestimonialList } from './M4'
import { M1, M4 } from '../content'

export function Welcome() {
  const [readFirst, setReadFirst] = useState(false)
  const t = M1.welcome
  return (
    <>
      <div aria-hidden className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`size-4 rounded-full ${LEVEL_TONE[n].bg}`} />
        ))}
      </div>
      <Heading eyebrow={t.eyebrow} title={t.title} />
      <div className="flex max-w-[60ch] flex-col gap-4 text-ink-soft">
        {t.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="text-sm font-bold text-ink">{t.meta}</p>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          aria-expanded={readFirst}
          onClick={() => setReadFirst((v) => !v)}
          className="w-fit text-left font-bold text-clay underline decoration-clay/40 underline-offset-4"
        >
          {t.readFirst}
        </button>
        {readFirst && (
          <div className="reveal">
            <TestimonialList items={M4.testimonials.items} origin={M4.testimonials.origin} />
          </div>
        )}
      </div>
    </>
  )
}

export function Consent() {
  const { state, set } = useStore()
  const t = M1.consent
  return (
    <>
      <Heading title={t.title} body={t.body} />
      <label className="flex cursor-pointer items-start gap-4 rounded-2xl bg-card p-4 ring-1 ring-line has-[:checked]:ring-2 has-[:checked]:ring-clay">
        <input
          type="checkbox"
          checked={state.consent}
          onChange={(e) => set(['consent'], e.target.checked)}
          className="mt-0.5 size-6 shrink-0 accent-[var(--color-clay)]"
        />
        <span className="font-bold">{t.adult}</span>
      </label>
      <div className="flex flex-col gap-3">
        <h2 id="participant" className="text-xl font-bold">
          {t.participantQuestion}
        </h2>
        <Choice
          labelledBy="participant"
          options={t.participants.map((p) => ({ key: p.key, label: p.label, sub: p.sub }))}
          value={state.participant}
          onChange={(k) => set(['participant'], k)}
        />
      </div>
    </>
  )
}

export function Agreements() {
  const t = M1.agreements
  return (
    <>
      <Heading title={t.title} />
      <ol className="flex flex-col gap-6">
        {t.items.map((item, i) => (
          <li key={item.title} className="grid grid-cols-[3rem_1fr] items-baseline gap-x-2">
            <span aria-hidden className="font-display text-4xl font-black text-clay/70">
              {i + 1}
            </span>
            <div>
              <p className="font-display text-xl font-bold">{item.title}</p>
              <p className="text-ink-soft">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

export function Checkin() {
  const { state, set } = useStore()
  const t = M1.checkin
  return (
    <>
      <Heading title={t.title} body={t.body} />
      <EmotionWheel
        emotions={t.emotions}
        value={state.checkin.emotion}
        onChange={(v) => set(['checkin', 'emotion'], v)}
        otherLabel={t.otherLabel}
        otherPlaceholder={t.otherPlaceholder}
        otherValue={state.checkin.other}
        onOtherChange={(v) => set(['checkin', 'other'], v)}
      />
      <TextField
        label={t.likeLabel}
        placeholder={t.likePlaceholder}
        value={state.checkin.like}
        onChange={(v) => set(['checkin', 'like'], v)}
        rows={2}
      />
    </>
  )
}
