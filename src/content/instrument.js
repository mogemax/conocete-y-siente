// Instrumento de medición: el MISMO antes (Módulo 1) y después (Módulo 5).

export const INSTRUMENT = {
  phases: {
    pre: { eyebrow: 'Tu punto de partida', resultTitle: 'Así empiezas' },
    post: { eyebrow: 'Tu punto de llegada', resultTitle: 'Así terminas' },
  },
  levelStep: {
    title: '¿Con cuál te identificas hoy?',
    body: 'Elige la tarjeta que más se parece a ti ahorita. No hay respuesta correcta.',
  },
  statementStep: {
    title: '¿Qué tan de acuerdo estás?',
    counter: (i, total) => `Afirmación ${i} de ${total}`,
  },
  situationStep: {
    title: '¿Qué harías tú?',
    body: 'Elige lo que harías de verdad, no lo que "deberías" hacer.',
    counter: (i, total) => `Situación ${i} de ${total}`,
  },
  result: {
    level: 'Nivel que elegiste',
    statements: 'Promedio de afirmaciones',
    situations: 'Nivel promedio en situaciones',
    preNote: 'Guardamos esto para compararlo al final. Nadie más lo ve.',
    postNote: 'En la siguiente pantalla lo comparas con tu inicio.',
  },
}

export const SCALE = {
  min: 'Nada de acuerdo',
  max: 'Totalmente de acuerdo',
}

export const STATEMENTS = [
  'Puedo decir cómo me siento en una situación social nueva.',
  'Sé qué cosas me gustan y se me dan bien.',
  'Puedo contarle un gusto mío a alguien de mi generación que no conozco.',
  'Me siento capaz de acercarme a alguien de mi generación que no conozco.',
  'Puedo proponer un plan (comer juntos, estudiar) a alguien que apenas conozco.',
  'Cuando algo sale mal al convivir, me trato con amabilidad.',
]

// Cada opción corresponde a un nivel del 1 al 4. Se muestran en orden aleatorio.
export const MEASUREMENT_SITUATIONS = [
  {
    id: 's1',
    text: 'Llegas a tu clase y todos ya están sentados en grupitos.',
    options: [
      { level: 1, text: 'Me siento hasta atrás, me pongo audífonos y espero a que termine.' },
      { level: 2, text: 'Me siento cerca de un grupo; sé que quiero platicar, pero no digo nada.' },
      { level: 3, text: 'Me siento junto a alguien y le comento algo de la clase o de algo que me gusta.' },
      { level: 4, text: 'Me presento con el grupo y les propongo comer juntos después.' },
    ],
  },
  {
    id: 's2',
    text: 'En un trabajo en equipo, alguien menciona una serie o un juego que te encanta.',
    options: [
      { level: 1, text: 'Me quedo callado; mejor no meterme.' },
      { level: 2, text: 'Pienso "a mí también me gusta", pero no lo digo.' },
      { level: 3, text: 'Digo que también me gusta y le pregunto cuál es su parte favorita.' },
      { level: 4, text: 'Le cuento que me gusta y le propongo verla o jugar juntos un día.' },
    ],
  },
  {
    id: 's3',
    text: 'Te invitan a un evento de tu carrera donde casi no conoces a nadie.',
    options: [
      { level: 1, text: 'No voy; seguro me voy a sentir fuera de lugar.' },
      { level: 2, text: 'Voy, pero me quedo solo con el celular aunque sé que quiero platicar.' },
      { level: 3, text: 'Me acerco a un grupo pequeño, cuento algo de mí y hago una pregunta.' },
      { level: 4, text: 'Inicio una conversación con alguien nuevo y lo invito a ir juntos al próximo evento.' },
    ],
  },
]
