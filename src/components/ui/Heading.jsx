/** Encabezado de pantalla: etiqueta opcional, título y bajada. */
export function Heading({ eyebrow, title, body, id }) {
  return (
    <header className="flex flex-col gap-3">
      {eyebrow && <p className="text-sm font-bold tracking-wide text-clay uppercase">{eyebrow}</p>}
      <h1 id={id} className="text-[1.75rem] font-bold text-ink sm:text-[2rem]">
        {title}
      </h1>
      {body && <p className="max-w-[60ch] text-ink-soft">{body}</p>}
    </header>
  )
}
