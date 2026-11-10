/** Devuelve una copia barajada (Fisher–Yates). */
export function shuffle(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Índices barajados de las opciones de cada situación: { [id]: [2, 0, 3, 1] } */
export function shuffledOrders(situations) {
  return Object.fromEntries(situations.map((s) => [s.id, shuffle(s.options.map((_, i) => i))]))
}
