import { MODULES, UI } from '../../content'

/**
 * Barra de progreso por módulo: cada segmento mide lo que dura el módulo (5, 10, 10, 25, 10 min)
 * y se llena según los pasos completados dentro de él.
 */
export function ProgressHeader({ moduleId, fractionByModule }) {
  const current = MODULES.find((m) => m.id === moduleId)
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="font-bold text-ink">
          <span className="text-ink-soft">{UI.moduleOf(current.n, MODULES.length)} · </span>
          {current.title}
        </p>
        <p className="shrink-0 text-ink-soft">{UI.minutes(current.minutes)}</p>
      </div>
      <div className="flex gap-1.5" role="img" aria-label={`${UI.moduleOf(current.n, MODULES.length)}: ${current.title}`}>
        {MODULES.map((m) => (
          <div
            key={m.id}
            className="h-2 overflow-hidden rounded-full bg-line"
            style={{ flexGrow: m.minutes, flexBasis: 0 }}
          >
            <div
              className={`h-full origin-left rounded-full transition-transform duration-700 ease-[var(--ease-out-quart)] ${
                m.id === moduleId ? 'bg-clay' : 'bg-sage'
              }`}
              style={{ transform: `scaleX(${fractionByModule[m.id] ?? 0})` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
