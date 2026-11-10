/** Selección múltiple con tope (p. ej. 1 o 2 valores). */
export function Chips({ options, value, onChange, max }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt))
    else if (value.length < max) onChange([...value, opt])
    else onChange([...value.slice(1), opt]) // al pasar del tope, reemplaza el más antiguo
  }
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const on = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(opt)}
            className={`min-h-12 rounded-full px-5 font-bold ring-1 transition-[transform,background-color,color] duration-200 ease-out active:scale-95 ${
              on ? 'bg-sage text-card ring-sage' : 'bg-card text-ink ring-line hover:ring-ink-faint'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
