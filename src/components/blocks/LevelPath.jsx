import { LEVELS, LEVEL_PATH, TARGET_LEVEL } from '../../content'

// Sendero que sube por la ladera: una parada por nivel (viewBox 340×200).
const STOPS = LEVELS.map((l, i) => ({ ...l, x: 34 + i * 68, y: 150 - i * 24 }))
const FILL = { 1: 'fill-l1', 2: 'fill-l2', 3: 'fill-l3', 4: 'fill-l4', 5: 'fill-l5' }
const INK = { 1: 'fill-l1-ink', 2: 'fill-l2-ink', 3: 'fill-l3-ink', 4: 'fill-l4-ink', 5: 'fill-l5-ink' }

const segment = (a, b) => `M${a.x} ${a.y}C${a.x + 34} ${a.y} ${b.x - 34} ${b.y} ${b.x} ${b.y}`
const hill = `M0 200V${STOPS[0].y + 20}${STOPS.map((s) => `L${s.x} ${s.y + 20}`).join('')}L340 ${STOPS[4].y + 14}V200Z`

/** Tramo i→i+1: recorrido (hoja), el siguiente paso (oliva) o pendiente (punteado). */
function segmentStyle(from, current) {
  if (current == null) return 'stroke-ink-faint [stroke-dasharray:3_7]'
  if (from < current) return 'stroke-leaf'
  if (from === current) return 'stroke-accent [stroke-width:4]'
  return 'stroke-ink-faint [stroke-dasharray:3_7]'
}

/**
 * Diagrama de los 5 niveles como un camino. current (opcional) marca "Estás aquí" y resalta el siguiente tramo.
 * El SVG es decorativo; la lista oculta lo describe para lectores de pantalla.
 */
export function LevelPath({ current = null }) {
  const next = current != null && current < LEVELS.length ? LEVELS[current] : null
  // Recorta el aire de arriba: solo deja espacio para la parada más alta y la etiqueta "Estás aquí".
  const top = Math.max(0, Math.min(STOPS.at(-1).y - 22, current != null ? STOPS[current - 1].y - 50 : Infinity))
  return (
    <figure className="flex flex-col gap-3">
      <svg viewBox={`0 ${top} 340 ${200 - top}`} className="w-full font-body" aria-hidden focusable="false">
        <path d={hill} className="fill-lime-faint" />
        {STOPS.slice(0, -1).map((s, i) => (
          <path key={s.n} d={segment(s, STOPS[i + 1])} fill="none" strokeWidth="3" strokeLinecap="round" className={segmentStyle(s.n, current)} />
        ))}
        {STOPS.map((s) => {
          const here = s.n === current
          return (
            <g key={s.n}>
              <circle cx={s.x} cy={s.y} r={here ? 18 : 15} className={`${FILL[s.n]} ${here ? 'stroke-accent' : 'stroke-card'}`} strokeWidth={here ? 3.5 : 3} />
              <text x={s.x} y={s.y + 4.5} textAnchor="middle" className={`${INK[s.n]} text-[13px] font-semibold`}>
                {s.n}
              </text>
              <text x={s.x} y={s.y + 36} textAnchor="middle" className="fill-ink text-[12px] font-semibold">
                {s.name}
              </text>
              {s.n === TARGET_LEVEL && (
                <text x={s.x} y={s.y + 51} textAnchor="middle" className="fill-accent text-[11px] font-semibold italic">
                  {LEVEL_PATH.goal}
                </text>
              )}
              {here && (
                <g>
                  <rect x={s.x - 33} y={s.y - 46} width="66" height="21" rx="10.5" className="fill-accent" />
                  <text x={s.x} y={s.y - 31.5} textAnchor="middle" className="fill-card text-[11px] font-semibold">
                    {LEVEL_PATH.here}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
      <figcaption className="sr-only">{LEVEL_PATH.caption}</figcaption>
      <ol className="sr-only">
        {LEVELS.map((l) => (
          <li key={l.n}>
            {`Nivel ${l.n}, ${l.name}: ${l.card}`}
            {l.n === current && ` (${LEVEL_PATH.here})`}
            {l.n === TARGET_LEVEL && ` (${LEVEL_PATH.goal})`}
          </li>
        ))}
      </ol>
      {next && (
        <p className="rounded-[1.25rem] bg-accent-soft p-4 text-leaf-ink">
          <span className="block text-sm font-semibold">{LEVEL_PATH.next}</span>
          <span className="font-semibold text-ink">
            {next.n} · {next.name}:
          </span>{' '}
          {next.card}
        </p>
      )}
    </figure>
  )
}
