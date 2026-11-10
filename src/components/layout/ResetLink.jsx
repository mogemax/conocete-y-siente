import { useState } from 'react'
import { RESET } from '../../content'

/** Borrar todo el avance local, con confirmación en línea (sin diálogos del navegador). */
export function ResetLink({ onReset }) {
  const [confirming, setConfirming] = useState(false)
  if (!confirming)
    return (
      <button type="button" onClick={() => setConfirming(true)} className="text-sm text-ink-faint underline-offset-4 hover:underline">
        {RESET.link}
      </button>
    )
  return (
    <div className="reveal flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <span className="text-ink-soft">{RESET.confirm}</span>
      <button type="button" onClick={onReset} className="font-bold text-clay-deep underline underline-offset-4">
        {RESET.yes}
      </button>
      <button type="button" onClick={() => setConfirming(false)} className="text-ink-soft underline underline-offset-4">
        {RESET.no}
      </button>
    </div>
  )
}
