// Landing de introducción (antes del recorrido). Encierra una palabra entre *asteriscos* para la itálica oliva.

export const LANDING = {
  hero: {
    eyebrow: 'Una experiencia de 60 minutos, a tu ritmo',
    title: 'Conócete y *siente.*',
    body: 'Si sientes que todos ya tienen su grupo, no eres el único. Aquí vas a entender qué sientes, qué te gusta y cómo compartirlo, para que conocer gente cueste un poco menos.',
    secondary: 'Conoce el camino',
  },
  purpose: {
    title: 'Conocerte es el primer *paso.*',
    // Definición de la competencia (Formato 1, ficha).
    body: 'El autoconocimiento es la capacidad de reconocer y comprender tus emociones, pensamientos, fortalezas y valores. Cuando sabes qué sientes y qué te gusta, es más fácil contárselo a alguien, y ahí empiezan las amistades.',
  },
  path: {
    title: 'Es un proceso, no un *examen.*',
    body: 'Nadie pasa de callarse a hacer planes en un día. Hay cinco niveles; la mayoría empieza en el 2. La meta de esta experiencia es llegar al 3: contar algo tuyo en un grupo pequeño y hacer una pregunta.',
    cta: 'Ver el camino completo',
  },
  testimonials: {
    title: 'A otros también les *pasó.*',
  },
  modules: {
    title: 'Cinco módulos, unos 60 *minutos.*',
    // Una línea por módulo, en el orden de MODULES (content/index.js).
    lines: {
      m1: 'Cómo llegas hoy y en qué nivel te ubicas.',
      m2: 'Cuatro tarjetas y un quiz rápido.',
      m3: 'Tu mapa personal y lo que quieres cuidar.',
      m4: 'Situaciones del campus, personas que se conocen bien y testimonios.',
      m5: 'Comparas tu antes y después y armas tu plan.',
    },
    note: 'Puedes hacerlo en 2 o 3 visitas; tu avance se guarda solo.',
  },
  takeaways: {
    title: 'Te vas con un *plan.*',
    body: 'Un plan de 4 semanas con una acción pequeña por semana, un compromiso "Si…, entonces…", recursos según tu nivel y una constancia para descargar.',
  },
  privacy: {
    title: 'Lo que escribes es *tuyo.*',
    body: 'Tus respuestas escritas se quedan en tu celular. Solo enviamos números anónimos, sin nombre, para mejorar la experiencia.',
  },
  closing: {
    title: 'Empieza cuando *quieras.*',
    body: 'Son unos 60 minutos y puedes pausar cuando lo necesites; tu avance se guarda solo.',
  },
}

// Diagrama de los 5 niveles (landing, resultado inicial y plan).
export const LEVEL_PATH = {
  caption: 'El camino del autoconocimiento',
  here: 'Estás aquí',
  goal: 'Meta',
  next: 'Tu siguiente paso',
}
