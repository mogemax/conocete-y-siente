import { Ticket } from './Ticket'
import { LEVEL_TONE } from './tones'

/** Boleto de nivel: etiqueta arriba, número gigante + nombre, y descripción opcional bajo la línea punteada. */
export function LevelTicket({ label, n, name, children }) {
  const tone = LEVEL_TONE[n]
  return (
    <Ticket notchAt={children ? '62%' : '50%'} className={`flex flex-col rounded-[1.4rem] ${tone.bg}`}>
      <div className="flex items-end justify-between gap-4 px-5 pt-4 pb-4">
        <div className="flex flex-col gap-1">
          <p className={`text-sm font-semibold ${tone.ink}`}>{label}</p>
          <p className={`font-display text-2xl font-semibold ${tone.ink}`}>{name}</p>
        </div>
        <p className={`font-display text-[4.5rem] leading-[0.8] font-semibold tracking-[-0.05em] [font-stretch:120%] ${tone.ink}`}>{n}</p>
      </div>
      {children && <div className="border-t-2 border-dashed border-card/80 px-5 pt-3.5 pb-5">{children}</div>}
    </Ticket>
  )
}
