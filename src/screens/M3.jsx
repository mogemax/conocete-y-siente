import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { Chips } from '../components/ui/Chips'
import { Scale } from '../components/ui/Scale'
import { M3 } from '../content'

export function Values() {
  const { state, set } = useStore()
  const t = M3.values
  return (
    <>
      <Heading title={t.title} body={t.body} />
      <Chips options={t.options} value={state.values} onChange={(v) => set(['values'], v)} max={t.max} />
      <input
        value={state.valueOther}
        onChange={(e) => set(['valueOther'], e.target.value)}
        placeholder={t.otherPlaceholder}
        aria-label={t.otherPlaceholder}
        maxLength={40}
        className="min-h-12 rounded-2xl bg-card px-4 ring-1 ring-line placeholder:text-ink-faint focus:ring-2 focus:ring-accent focus:outline-none"
      />
    </>
  )
}

export function Strengthen() {
  const { state, set } = useStore()
  const t = M3.strengthen
  return (
    <>
      <Heading id="strengthen" title={t.title} body={t.body} />
      <Scale labelledBy="strengthen" value={state.strengthen} onChange={(n) => set(['strengthen'], n)} min={t.min} max={t.max} />
    </>
  )
}

export function Closing() {
  const t = M3.closing
  return (
    <>
      <blockquote className="font-display text-[2rem] leading-tight font-semibold text-accent">“{t.title}”</blockquote>
      <p className="text-ink-soft">{t.body}</p>
    </>
  )
}
