/** Convierte "Conócete y *siente.*" en texto con la palabra de acento en <em> (itálica oliva). */
export function Accent({ text }) {
  if (typeof text !== 'string') return text
  return text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}

/** El mismo texto sin las marcas de acento (para etiquetas, aria y canvas). */
export const plainText = (text) => String(text).replace(/\*/g, '')
