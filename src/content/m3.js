// Módulo 3 · Identifícala (responsable: Nadia Villegas)

export const M3 = {
  intro: {
    title: 'Tu mapa *personal*',
    body: 'Cuatro preguntas para ubicar qué te incomoda, qué sientes y qué te hace sentir bien. Escribe lo que salga; nadie más lo va a leer.',
  },
  map: [
    {
      key: 'incomodan',
      title: 'Situaciones que me incomodan',
      hint: 'Por ejemplo: llegar a un salón donde todos ya se conocen.',
    },
    {
      key: 'siento',
      title: '¿Qué siento en ellas?',
      hint: 'Nervios, miedo, ganas de irme… ponle nombre.',
    },
    {
      key: 'gusta',
      title: 'Lo que me gusta y se me da bien',
      hint: 'Nathaniel Branden decía que reconocer lo que vales es la base de una autoestima sana. Vale todo: series, deportes, cocinar, escuchar.',
    },
    {
      key: 'comodo',
      title: 'La última vez que me sentí cómodo con otras personas',
      hint: '¿Dónde estabas, con quién y qué estaban haciendo?',
    },
  ],
  values: {
    title: '¿Qué quieres cuidar al conocer gente?',
    body: 'Elige 1 o 2 valores.',
    options: ['Autenticidad', 'Respeto', 'Lealtad', 'Humor', 'Honestidad', 'Empatía', 'Curiosidad'],
    otherPlaceholder: 'Otro valor (opcional)',
    max: 2,
  },
  strengthen: {
    title: '¿Cuánto quieres fortalecer esto?',
    body: 'Conocerte para animarte a compartir.',
    min: 'Poquito',
    max: 'Muchísimo',
  },
  closing: {
    title: 'La mejor forma de iniciar una amistad es ser tú mismo.',
    body: 'Ya tienes tu mapa. Ahora toca practicar.',
  },
}
