import { useRef, useState } from 'react'

/** Fila de tarjetas con scroll-snap nativo e indicador de posición. */
export function SwipeCards({ items, renderItem, hint, label }) {
  const rowRef = useRef(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const row = rowRef.current
    const first = row.firstElementChild
    if (!first) return
    const step = first.getBoundingClientRect().width + 12
    setActive(Math.min(items.length - 1, Math.round(row.scrollLeft / step)))
  }

  const goTo = (i) => {
    const el = rowRef.current.children[i]
    el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={rowRef} onScroll={onScroll} className="snap-row" role="region" aria-label={label} tabIndex={0}>
        {items.map((item, i) => (
          <div key={i} aria-roledescription="tarjeta" aria-label={`${i + 1} de ${items.length}`}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        {hint && <p className="text-sm text-ink-soft">{hint}</p>}
        <div className="ml-auto flex gap-1">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la tarjeta ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className="grid size-7 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? 'w-5 bg-clay' : 'w-2 bg-line'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
