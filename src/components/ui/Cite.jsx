/** Cita corta en APA: "Eurich, 2017" → "(Eurich, 2017)". La referencia completa vive en content/references.js. */
export function Cite({ sources, className = '' }) {
  const list = [].concat(sources).filter(Boolean)
  if (!list.length) return null
  return <p className={`text-sm text-ink-faint ${className}`}>({list.join('; ')})</p>
}
