// Módulo 2 · Qué es (responsable: Esteban Amezcua)

export const M2 = {
  intro: {
    title: '¿Qué es eso de conocerte?',
    body: 'Cuatro tarjetas cortas, un video opcional y tres preguntas rápidas para comprobar que quedó claro.',
  },
  lesson: {
    eyebrow: 'Micro-lección',
    hint: 'Desliza para ver la siguiente',
    cards: [
      {
        title: 'Autoconocimiento',
        body: 'Es la capacidad de reconocer y comprender nuestras emociones, pensamientos, fortalezas, debilidades y valores. En corto: saber qué sientes, qué te gusta y qué te importa.',
      },
      {
        title: 'Dos formas de conocerte',
        body: 'La psicóloga Tasha Eurich explica que hay dos lados: conocerte por dentro (qué sientes, qué valoras) y saber cómo te ven los demás. Los dos se pueden entrenar.',
        source: 'Eurich, 2017',
      },
      {
        title: 'La confianza crece en pasos chiquitos',
        body: 'Albert Bandura llamó autoeficacia a confiar en que puedes lograr algo. Crece con pequeñas experiencias de éxito: un saludo que salió bien hace más fácil el siguiente.',
        source: 'Bandura, 1977',
      },
      {
        title: '¿Y esto qué tiene que ver con hacer amigos?',
        body: 'Si sabes qué te gusta y cómo te sientes, tienes de qué platicar y es más fácil encontrar a tu gente. Las amistades empiezan cuando compartimos algo real de nosotros.',
      },
    ],
  },
  video: {
    title: 'Un video corto',
    body: 'Opcional. Si no puedes verlo ahora, sigue adelante.',
    // TODO(equipo): URL de embed con subtítulos, p. ej. https://www.youtube-nocookie.com/embed/ID?cc_load_policy=1
    url: '',
    urlTodo: 'URL del video de la micro-lección (con subtítulos).',
  },
  quiz: {
    eyebrow: 'Comprobación',
    counter: (i, total) => `Pregunta ${i} de ${total}`,
    questions: [
      {
        id: 'q1',
        question: 'Según la definición, el autoconocimiento es…',
        options: [
          'Saber mucho de psicología.',
          'Reconocer y comprender tus emociones, pensamientos, fortalezas, debilidades y valores.',
          'Caerle bien a todo mundo.',
        ],
        correct: 1,
        right: '¡Exacto! Es entender lo que pasa dentro de ti: lo que sientes, piensas y valoras.',
        retry: 'Casi. El autoconocimiento es reconocer y comprender tus emociones, pensamientos, fortalezas, debilidades y valores.',
      },
      {
        id: 'q2',
        question: 'Tasha Eurich dice que conocerse tiene dos lados. ¿Cuáles son?',
        options: [
          'Mis calificaciones y mis amistades.',
          'Lo que me gusta y lo que no.',
          'Conocerme por dentro y saber cómo me ven los demás.',
        ],
        correct: 2,
        right: '¡Así es! Por eso a veces ayuda preguntarle a alguien de confianza cómo te ve.',
        retry: 'Casi. Eurich habla de conocerte por dentro y de saber cómo te ven los demás.',
      },
      {
        id: 'q3',
        question: 'Según Bandura, ¿qué hace crecer la confianza en ti mismo?',
        options: [
          'Esperar a sentirte listo.',
          'Pequeñas experiencias de éxito, una tras otra.',
          'Que alguien te diga que eres capaz.',
        ],
        correct: 1,
        right: '¡Eso! Por eso tu plan será de acciones pequeñas, una por semana.',
        retry: 'Casi. Para Bandura, la confianza crece con pequeñas experiencias de éxito, una tras otra.',
      },
    ],
  },
}
