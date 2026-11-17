import { Accent } from '../ui/Accent'
import { Pill } from '../ui/Pill'
import { M4 } from '../../content'

/** Título de sección del sitio (admite *acento*), con pastilla opcional. */
export function SectionTitle({ eyebrow, title, as: Tag = 'h2', className = '' }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {eyebrow && <Pill>{eyebrow}</Pill>}
      <Tag className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.02] text-ink">
        <Accent text={title} />
      </Tag>
    </div>
  )
}

/** Sección del sitio con el ritmo vertical común. */
export function Section({ className = '', children }) {
  return <section className={`site-container py-16 lg:py-24 ${className}`}>{children}</section>
}

/** Bloque de texto con título (admite *acento*). */
export function TextBlock({ title, body, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 rounded-[2rem] p-8 lg:p-10 ${className}`}>
      <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] text-ink">
        <Accent text={title} />
      </h2>
      <p className="text-lg text-ink-soft">{body}</p>
    </div>
  )
}

const QUOTE_TONES = ['bg-l1', 'bg-l2', 'bg-l3']

/** Las tres frases de alumnos (diagnóstico del equipo) en fila. */
export function QuoteGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {M4.testimonials.items.map((quote, i) => (
        <li key={quote} className={`flex flex-col justify-between gap-6 rounded-[2rem] p-7 ${QUOTE_TONES[i % 3]}`}>
          <p className="font-display text-2xl leading-snug">“{quote}”</p>
          <p className="text-sm text-ink-soft">{M4.testimonials.origin}</p>
        </li>
      ))}
    </ul>
  )
}
