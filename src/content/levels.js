// Escala de 5 niveles de autoconocimiento (Formato 1, anexo A) y tips para subir de nivel (Formato 1, sección I).

export const LEVELS = [
  {
    n: 1,
    name: 'Evita',
    card: 'Me quedo en silencio y espero a que me busquen.',
    tip: 'Al final del día, escribe una emoción y un gusto del día. Pregúntate "¿qué siento?".',
  },
  {
    n: 2,
    name: 'Reconoce',
    card: 'Sé lo que siento y lo que me gusta, pero lo guardo.',
    tip: 'Comparte un gusto con una sola persona esta semana.',
  },
  {
    n: 3,
    name: 'Comparte',
    card: 'En un grupo pequeño cuento un gusto y cómo me siento, y pregunto algo.',
    tip: 'Lleva una lista semanal de logros pequeños y cuéntale uno a alguien de confianza.',
  },
  {
    n: 4,
    name: 'Conecta',
    card: 'Inicio conversaciones y propongo planes.',
    tip: 'Pídele a un compañero que te diga una fortaleza tuya y una cosa que puedas mejorar.',
  },
  {
    n: 5,
    name: 'Sostiene',
    card: 'Mantengo amistades y digo mi opinión con respeto.',
    tip: 'Cuando te equivoques, háblate como le hablarías a un amigo.',
  },
]

export const TARGET_LEVEL = 3

export const levelByN = (n) => LEVELS.find((l) => l.n === n)

// Sugerencias del plan de 4 semanas según el nivel (editables por el usuario).
// La semana 1 siempre es el tip de su nivel.
export const PLAN_SUGGESTIONS = {
  1: [
    'Cada noche anota una emoción y un gusto del día. Pregúntate "¿qué siento?".',
    'Ubica un momento de la semana en que te sentiste incómodo y ponle nombre a lo que sentiste.',
    'En una clase, siéntate cerca de alguien y salúdalo.',
    'Hazle una pregunta sencilla a alguien de tu salón, como "¿qué te pareció la tarea?".',
  ],
  2: [
    'Comparte un gusto con una sola persona.',
    'Pregúntale a alguien de tu salón qué le gusta hacer fuera de la uni.',
    'En un grupo pequeño, cuenta cómo te sientes con algo de la semana (un examen, una clase).',
    'Súmate a una plática antes de clase o en la cafetería y aporta algo tuyo.',
  ],
  3: [
    'Lleva tu lista de logros pequeños y cuéntale uno a alguien de confianza.',
    'Inicia una conversación con alguien nuevo de tu generación.',
    'Propón un plan sencillo: comer juntos o estudiar.',
    'Repite el plan con la misma persona o invita a alguien más.',
  ],
  4: [
    'Pídele a un compañero una fortaleza tuya y una cosa que puedas mejorar.',
    'Organiza un plan con un grupo pequeño (estudiar, ir a un evento).',
    'En un trabajo en equipo, di tu opinión con respeto cuando no estés de acuerdo.',
    'Busca a alguien que se vea solo y súmalo a la plática.',
  ],
  5: [
    'Cuando te equivoques, háblate como le hablarías a un amigo.',
    'Escríbele a un amigo para saber cómo va.',
    'Di cuando no estés de acuerdo, con respeto, en una situación real.',
    'Ayuda a alguien de primer semestre a integrarse.',
  ],
}
