import { MODULES } from '../../content'

/** Número gigante del módulo con sus vecinos recortados a los lados (1·2·3 del reference). */
export function ModuleNumerals({ n }) {
  const prev = n > 1 ? n - 1 : null
  const next = n < MODULES.length ? n + 1 : null
  const base = 'font-display text-[clamp(13rem,62vw,18rem)] leading-[0.8] font-semibold tracking-[-0.06em] [font-stretch:120%]'
  return (
    <div aria-hidden className="relative -mx-5 flex h-[clamp(11rem,52vw,15rem)] items-end justify-center overflow-hidden">
      {prev && <span className={`${base} absolute right-[calc(50%+0.34em)] text-lime-soft`}>{prev}</span>}
      <span className={`${base} relative text-leaf`}>{n}</span>
      {next && <span className={`${base} absolute left-[calc(50%+0.34em)] text-lime-faint`}>{next}</span>}
    </div>
  )
}
