// Colores validados con el validador de dataviz sobre #fbfcf7 (todas las revisiones PASS).
const BEFORE = '#7e8cd0'
const AFTER = '#4a5e12'

/**
 * Antes/después en filas independientes: cada métrica tiene su propia escala (5, 5 y 4),
 * así que nunca comparten eje. Valores rotulados directamente, leyenda arriba.
 * rows: [{ label, max, before, after }]
 */
export function BeforeAfterChart({ rows, beforeLabel, afterLabel }) {
  return (
    <figure className="flex flex-col gap-5">
      <figcaption className="flex gap-5 text-sm text-ink-soft">
        <LegendItem color={BEFORE} label={beforeLabel} />
        <LegendItem color={AFTER} label={afterLabel} />
      </figcaption>
      {rows.map((r) => (
        <div key={r.label} className="flex flex-col gap-2">
          <p className="font-semibold">{r.label}</p>
          <Bar value={r.before} max={r.max} color={BEFORE} label={beforeLabel} />
          <Bar value={r.after} max={r.max} color={AFTER} label={afterLabel} delay />
        </div>
      ))}
      <table className="sr-only">
        <thead>
          <tr>
            <th>Métrica</th>
            <th>{beforeLabel}</th>
            <th>{afterLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td>{r.before} de {r.max}</td>
              <td>{r.after} de {r.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

function LegendItem({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="size-3 rounded-[3px]" style={{ background: color }} />
      {label}
    </span>
  )
}

function Bar({ value, max, color, label, delay = false }) {
  const pct = Math.max(0, Math.min(1, (value ?? 0) / max))
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <div className="h-3 flex-1 overflow-hidden rounded-r-[4px] bg-paper-deep">
        <div
          className="bar-grow h-full origin-left rounded-r-[4px]"
          style={{ background: color, transform: `scaleX(${pct})`, animationDelay: delay ? '180ms' : '0ms' }}
          title={`${label}: ${value} de ${max}`}
        />
      </div>
      <span className="w-14 shrink-0 text-right font-semibold tabular-nums">
        {value ?? '–'}
        <span className="font-normal text-ink-faint">/{max}</span>
      </span>
    </div>
  )
}
