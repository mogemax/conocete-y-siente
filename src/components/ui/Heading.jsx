import { Accent } from './Accent'
import { Pill } from './Pill'

/** Encabezado de pantalla: pastilla opcional, título (admite *acento*) y bajada. */
export function Heading({ eyebrow, title, body, id, size = 'md' }) {
  const sizes = { md: 'text-[2.125rem]', lg: 'text-[clamp(2.75rem,13vw,3.5rem)] leading-[1.02]' }
  return (
    <header className="flex flex-col gap-4">
      {eyebrow && <Pill>{eyebrow}</Pill>}
      <h1 id={id} className={`${sizes[size]} text-ink`}>
        <Accent text={title} />
      </h1>
      {body && <p className="max-w-[60ch] text-ink-soft">{body}</p>}
    </header>
  )
}
