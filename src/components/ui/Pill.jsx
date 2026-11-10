/** Etiqueta tipo pastilla (contadores, secciones, lugares). */
export function Pill({ children, tone = 'soft', className = '' }) {
  const tones = {
    soft: 'bg-accent-soft text-leaf-ink',
    outline: 'bg-card text-ink-soft ring-1 ring-line',
  }
  return (
    <span className={`inline-flex min-h-8 w-fit items-center rounded-full px-3.5 py-1 text-sm font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
