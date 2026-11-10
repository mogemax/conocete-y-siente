/**
 * Lista de opciones grandes con selección única (semántica de radio).
 * options: [{ key, label, sub?, tone?: { bg, ink } }]
 */
export function Choice({ options, value, onChange, disabled = false, labelledBy }) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-col gap-3">
      {options.map((opt) => {
        const selected = value === opt.key
        const dimmed = disabled && !selected
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(opt.key)}
            className={`group flex w-full items-start gap-4 rounded-2xl p-4 text-left ring-1 transition-[transform,background-color,box-shadow,opacity] duration-200 ease-out enabled:active:scale-[0.985] ${
              selected
                ? `ring-2 ring-clay ${opt.tone?.bg ?? 'bg-card'}`
                : `ring-line ${opt.tone?.bg ?? 'bg-card'} enabled:hover:ring-ink-faint`
            } ${dimmed ? 'opacity-45' : ''}`}
          >
            {opt.badge != null && (
              <span
                className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full font-display text-lg font-bold ${
                  opt.tone ? `bg-card/70 ${opt.tone.ink}` : 'bg-paper-deep text-ink-soft'
                }`}
              >
                {opt.badge}
              </span>
            )}
            <span className="flex flex-1 flex-col gap-0.5">
              <span className={`leading-snug ${opt.sub ? 'font-bold' : ''}`}>{opt.label}</span>
              {opt.sub && <span className="text-[0.95rem] text-ink-soft">{opt.sub}</span>}
            </span>
            <span
              aria-hidden
              className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full ring-2 transition-colors ${
                selected ? 'bg-clay ring-clay' : 'ring-line'
              }`}
            >
              {selected && (
                <svg viewBox="0 0 16 16" className="size-3.5 text-card">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
