import { MODULES } from '../../content'

/**
 * Número gigante del módulo con sus vecinos recortados a los lados (1·2·3 del reference).
 * Al montarse, la tira llega deslizándose desde el número anterior (.numerals-in).
 */
export function ModuleNumerals({ n }) {
  const prev = n > 1 ? n - 1 : null
  const next = n < MODULES.length ? n + 1 : null
  return (
    <div
      aria-hidden
      className="relative -mx-5 h-[clamp(11rem,52vw,15rem)] overflow-hidden font-display text-[clamp(13rem,62vw,18rem)] leading-[0.8] font-semibold tracking-[-0.06em] [font-stretch:120%]"
    >
      <div className={`absolute inset-0 flex items-end justify-center ${prev ? 'numerals-in' : ''}`}>
        {prev && <span className="absolute right-[calc(50%+0.34em)] text-lime-soft">{prev}</span>}
        <span className="relative text-leaf">{n}</span>
        {next && <span className="absolute left-[calc(50%+0.34em)] text-lime-faint">{next}</span>}
      </div>
    </div>
  )
}
