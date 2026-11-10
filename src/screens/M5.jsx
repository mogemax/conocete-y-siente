import { useState } from 'react'
import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { Button } from '../components/ui/Button'
import { Scale } from '../components/ui/Scale'
import { TextField } from '../components/ui/TextField'
import { Todo } from '../components/ui/Todo'
import { LEVEL_TONE } from '../components/ui/tones'
import { BeforeAfterChart } from '../components/blocks/BeforeAfterChart'
import { M5, PLAN_SUGGESTIONS, levelByN } from '../content'
import { summarize, trend } from '../lib/scoring'
import { copyText } from '../lib/clipboard'
import { renderCertificate } from '../lib/certificate'
import { sendRecord, buildOpinionRecord } from '../lib/sheets'
import { finalLevel, missingForCertificate } from '../flow/requirements'

export function Comparison() {
  const { state } = useStore()
  const t = M5.comparison
  const pre = summarize(state.measures.pre)
  const post = summarize(state.measures.post)
  const rows = [
    { label: t.metrics.level.label, max: t.metrics.level.max, before: pre.level, after: post.level },
    { label: t.metrics.statements.label, max: t.metrics.statements.max, before: pre.statementsAvg, after: post.statementsAvg },
    { label: t.metrics.situations.label, max: t.metrics.situations.max, before: pre.situationsAvg, after: post.situationsAvg },
  ]
  return (
    <>
      <Heading eyebrow={t.eyebrow} title={t.title} />
      <BeforeAfterChart rows={rows} beforeLabel={t.before} afterLabel={t.after} />
      <p className="rounded-2xl bg-sage-soft p-5 font-bold text-sage-ink">{t.messages[trend(state.measures.pre, state.measures.post)]}</p>
    </>
  )
}

export function IfThen() {
  const { state, set } = useStore()
  const t = M5.ifThen
  return (
    <>
      <Heading title={t.title} body={t.body} />
      <div className="flex flex-col gap-4">
        <TextField
          label={t.ifLabel}
          labelClassName="font-display text-2xl text-clay"
          placeholder={t.ifPlaceholder}
          value={state.ifThen.when}
          onChange={(v) => set(['ifThen', 'when'], v)}
          rows={2}
        />
        <TextField
          label={t.thenLabel}
          labelClassName="font-display text-2xl text-clay"
          placeholder={t.thenPlaceholder}
          value={state.ifThen.then}
          onChange={(v) => set(['ifThen', 'then'], v)}
          rows={2}
        />
      </div>
      <details className="group rounded-2xl bg-paper-deep p-4">
        <summary className="cursor-pointer font-bold">{t.examplesTitle}</summary>
        <ul className="mt-3 flex flex-col gap-2 text-ink-soft">
          {t.examples.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </details>
    </>
  )
}

export function Plan() {
  const { state, set } = useStore()
  const t = M5.plan
  const level = levelByN(finalLevel(state))
  const plan = state.plan ?? PLAN_SUGGESTIONS[level.n]
  const tone = LEVEL_TONE[level.n]
  const update = (i, v) => set(['plan'], plan.map((w, j) => (j === i ? v : w)))
  return (
    <>
      <Heading title={t.title} body={t.body(`el nivel ${level.n} · ${level.name}`)} />
      <section className={`flex flex-col gap-1 rounded-2xl p-5 ${tone.bg}`}>
        <p className={`text-sm font-bold ${tone.ink}`}>{t.tipTitle}</p>
        <p className="font-display text-lg font-bold">{level.tip}</p>
      </section>
      <ol className="flex flex-col gap-4">
        {plan.map((week, i) => (
          <li key={i}>
            <TextField label={t.week(i + 1)} value={week} onChange={(v) => update(i, v)} rows={2} />
          </li>
        ))}
      </ol>
    </>
  )
}

export function PromptCopy() {
  const { state } = useStore()
  const [copied, setCopied] = useState(false)
  const t = M5.prompt
  const level = levelByN(finalLevel(state))
  const text = t.template
    .replace('{nivel}', level.n)
    .replace('{nombreNivel}', level.name)
    .replace('{area}', state.area.trim() || t.areaFallback)
  const copy = async () => {
    setCopied(await copyText(text))
    setTimeout(() => setCopied(false), 2400)
  }
  return (
    <>
      <Heading title={t.title} body={t.body} />
      <pre className="max-h-64 overflow-y-auto rounded-2xl bg-card p-4 font-body text-sm whitespace-pre-wrap text-ink-soft ring-1 ring-line">
        {text}
      </pre>
      <Button variant="secondary" onClick={copy} aria-live="polite">
        {copied ? t.copied : t.copy}
      </Button>
    </>
  )
}

export function Resources() {
  const t = M5.resources
  return (
    <>
      <Heading title={t.title} />
      <ul className="flex flex-col divide-y divide-line">
        {t.items.map((r) => (
          <li key={r.title} className="flex flex-col gap-1.5 py-5 first:pt-0">
            {r.url ? (
              <a href={r.url} target="_blank" rel="noreferrer" className="font-display text-lg font-bold text-clay underline decoration-clay/30 underline-offset-4">
                {r.title} ↗
              </a>
            ) : (
              <p className="font-display text-lg font-bold">{r.title}</p>
            )}
            <p className="text-sm font-bold text-ink-soft">{r.author}</p>
            <p className="text-ink-soft">{r.description}</p>
            <p className="text-sm text-sage-ink">
              {t.levelLabel} {r.levels}
            </p>
            {!r.url && <Todo>{r.urlTodo}</Todo>}
          </li>
        ))}
      </ul>
    </>
  )
}

export function Certificate({ goto }) {
  const { state, set } = useStore()
  const [image, setImage] = useState(null)
  const [busy, setBusy] = useState(false)
  const t = M5.certificate
  const missing = missingForCertificate(state)

  if (missing.length)
    return (
      <>
        <Heading title={t.lockedTitle} body={t.lockedBody} />
        <ul className="flex flex-col gap-3">
          {missing.map((m) => (
            <li key={m.key} className="flex items-center justify-between gap-4 rounded-2xl bg-card p-4 ring-1 ring-line">
              <span>{t.missing[m.key]}</span>
              <Button variant="secondary" className="min-h-11 shrink-0 px-4 text-base" onClick={() => goto(m.stepId)}>
                {t.goTo}
              </Button>
            </li>
          ))}
        </ul>
      </>
    )

  const level = levelByN(finalLevel(state))
  const generate = async () => {
    setBusy(true)
    const date = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    setImage(await renderCertificate({ name: state.name.trim(), level: level.n, levelName: level.name, date }))
    setBusy(false)
  }

  return (
    <>
      <Heading title={t.title} />
      <div className="flex flex-col gap-2">
        <label htmlFor="cert-name" className="font-bold">
          {t.nameLabel}
        </label>
        <input
          id="cert-name"
          value={state.name}
          onChange={(e) => {
            set(['name'], e.target.value)
            setImage(null)
          }}
          maxLength={60}
          autoComplete="name"
          className="min-h-14 rounded-2xl bg-card px-4 text-lg ring-1 ring-line focus:ring-2 focus:ring-clay focus:outline-none"
        />
        <p className="text-sm text-ink-faint">{t.namePrivacy}</p>
      </div>
      {!image ? (
        <Button onClick={generate} disabled={!state.name.trim() || busy}>
          {t.generate}
        </Button>
      ) : (
        <div className="reveal flex flex-col gap-4">
          <img src={image} alt={`${t.image.kind}: ${state.name}`} className="w-full rounded-2xl shadow-[0_12px_40px_-12px_oklch(0.3_0.05_40/0.35)]" />
          <a
            href={image}
            download="constancia-conocete-y-siente.jpg"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-clay text-lg font-bold text-card hover:bg-clay-deep"
          >
            {t.download}
          </a>
          <p className="text-sm text-ink-faint">{t.saveHint}</p>
        </div>
      )}
    </>
  )
}

export function Survey({ next }) {
  const { state, set } = useStore()
  const [sending, setSending] = useState(false)
  const t = M5.survey
  const s = state.survey
  const hasAnswers = s.usefulness != null || s.learned.trim() || s.different.trim() || s.improve.trim()
  const send = async () => {
    setSending(true)
    const ok = await sendRecord(buildOpinionRecord(state))
    set(['sent', 'opinion'], ok)
    setSending(false)
    if (ok) next()
  }
  if (state.sent.opinion) return <Heading eyebrow={t.eyebrow} title={t.sent} />
  return (
    <>
      <Heading eyebrow={t.eyebrow} title={t.title} body={t.body} />
      <div className="flex flex-col gap-3">
        <p id="usefulness" className="font-bold">
          {t.usefulness}
        </p>
        <Scale labelledBy="usefulness" value={s.usefulness} onChange={(n) => set(['survey', 'usefulness'], n)} min={t.usefulnessMin} max={t.usefulnessMax} />
      </div>
      <TextField label={t.learned} value={s.learned} onChange={(v) => set(['survey', 'learned'], v)} rows={2} />
      <TextField label={t.different} value={s.different} onChange={(v) => set(['survey', 'different'], v)} rows={2} />
      <TextField label={t.improve} value={s.improve} onChange={(v) => set(['survey', 'improve'], v)} rows={2} />
      <Button variant="secondary" onClick={send} disabled={!hasAnswers || sending}>
        {t.send}
      </Button>
    </>
  )
}

export function Thanks({ goto }) {
  const t = M5.thanks
  return (
    <>
      <div aria-hidden className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`size-4 rounded-full ${LEVEL_TONE[n].bg}`} />
        ))}
      </div>
      <Heading title={t.title} body={t.body} />
      {t.community.url && (
        <section className="flex flex-col gap-3 rounded-3xl bg-sage-soft p-6 text-sage-ink">
          <h2 className="text-xl font-bold">{t.community.title}</h2>
          <p>{t.community.body}</p>
          <a href={t.community.url} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-fit items-center rounded-2xl bg-sage px-5 font-bold text-card">
            {t.community.cta}
          </a>
        </section>
      )}
      <Button variant="secondary" onClick={() => goto('bienvenida')}>
        {t.restart}
      </Button>
    </>
  )
}
