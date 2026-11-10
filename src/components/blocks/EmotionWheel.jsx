import { useState } from 'react'

const TONES = {
  alegria: 'bg-l5 text-l5-ink',
  calma: 'bg-l3 text-l3-ink',
  curiosidad: 'bg-[oklch(0.92_0.04_200)] text-[oklch(0.4_0.07_210)]',
  nervios: 'bg-l4 text-l4-ink',
  miedo: 'bg-l2 text-l2-ink',
  tristeza: 'bg-l1 text-l1-ink',
  enojo: 'bg-accent-soft text-accent-deep',
}

/** Rueda de emociones: 7 emociones alrededor y "Otra" al centro. */
export function EmotionWheel({ emotions, value, onChange, otherLabel, otherPlaceholder, otherValue, onOtherChange }) {
  const [otherOpen, setOtherOpen] = useState(value === 'otra')
  const selectOther = () => {
    setOtherOpen(true)
    onChange('otra')
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div role="radiogroup" aria-label="Emociones" className="relative aspect-square w-full max-w-[21rem]">
        <div aria-hidden className="absolute inset-[13%] rounded-full border-2 border-dashed border-line" />
        {emotions.map((e, i) => {
          const angle = (-90 + (i * 360) / emotions.length) * (Math.PI / 180)
          const selected = value === e.key
          return (
            <button
              key={e.key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(e.key)}
              style={{ left: `${50 + 37 * Math.cos(angle)}%`, top: `${50 + 37 * Math.sin(angle)}%` }}
              className={`absolute grid aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[0.8rem] leading-tight font-semibold transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] ${TONES[e.key]} ${
                selected ? 'scale-[1.14] shadow-[0_0_0_3px_var(--color-paper),0_0_0_6px_var(--color-accent)]' : 'hover:scale-105'
              }`}
            >
              {e.label}
            </button>
          )
        })}
        <button
          type="button"
          role="radio"
          aria-checked={value === 'otra'}
          onClick={selectOther}
          className={`absolute top-1/2 left-1/2 grid aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-semibold ring-1 transition-[transform,background-color] duration-300 ${
            value === 'otra' ? 'bg-ink text-card ring-ink' : 'bg-card text-ink ring-line hover:scale-105'
          }`}
        >
          {otherLabel}
        </button>
      </div>
      {otherOpen && value === 'otra' && (
        <input
          autoFocus
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder={otherPlaceholder}
          maxLength={60}
          aria-label={otherPlaceholder}
          className="reveal min-h-12 w-full rounded-2xl bg-card px-4 ring-1 ring-line focus:ring-2 focus:ring-accent focus:outline-none"
        />
      )}
    </div>
  )
}
