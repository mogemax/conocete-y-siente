/** Escala 1-5 con botones grandes. */
export function Scale({ value, onChange, min, max, labelledBy }) {
  return (
    <div className="flex flex-col gap-3">
      <div role="radiogroup" aria-labelledby={labelledBy} className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${n}${n === 1 ? ` (${min})` : n === 5 ? ` (${max})` : ''}`}
              onClick={() => onChange(n)}
              className={`aspect-square rounded-2xl font-display text-2xl font-bold ring-1 transition-[transform,background-color,color] duration-200 ease-out active:scale-95 ${
                selected ? 'bg-clay text-card ring-clay' : 'bg-card text-ink ring-line hover:ring-ink-faint'
              }`}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-sm text-ink-soft" aria-hidden>
        <span>1 · {min}</span>
        <span>5 · {max}</span>
      </div>
    </div>
  )
}
