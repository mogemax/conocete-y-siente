// Módulo 4 · Desarróllala jugando (responsables: Nadia Villegas y Esteban Montes)

export const M4 = {
  intro: {
    title: 'Hora de practicar',
    body: 'Tres estaciones: un juego de situaciones de campus, personas que se conocen bien a sí mismas y testimonios de gente como tú.',
  },

  game: {
    eyebrow: 'Situaciones de campus',
    counter: (round, attempt) => `Ronda ${round} de 3 · ${attempt === 'a' ? 'Primer intento' : 'Segundo intento'}`,
    secondIntro: 'Ahora una parecida. Aplica lo que acabas de ver.',
    chosenLevel: (n, name) => `Tu respuesta refleja el nivel ${n} · ${name}`,
    // Lectura amable de cada nivel (nunca "te equivocaste").
    levelReading: {
      1: 'Es muy normal querer protegerte cuando algo te pone nervioso.',
      2: 'Ya sabes lo que sientes y lo que quieres. Ese es el primer paso.',
      3: 'Contaste algo tuyo e hiciste una pregunta. ¡Esa es la meta!',
      4: 'Además de compartir, propusiste un plan. Vas más allá de la meta.',
    },
    level3Title: 'Alguien en nivel 3 haría esto',
    whyTitle: 'Por qué ayuda',
    progress: {
      up: (a, b) => `¡Subiste del nivel ${a} al ${b}! Lo aplicaste en una situación nueva.`,
      kept: (b) => `Lo sostuviste: otra vez nivel ${b}.`,
      same: 'Sin presión. Ya sabes qué haría alguien en nivel 3; la práctica hace el resto.',
    },
    rounds: [
      {
        id: 'r1',
        a: {
          place: 'Cafetería',
          text: 'Llegas a la cafetería con tu comida y todas las mesas están ocupadas. En una hay dos personas de tu salón.',
          options: [
            { level: 1, text: 'Me salgo a comer a otro lado, aunque no tenga dónde sentarme.' },
            { level: 2, text: 'Me siento en la orilla de su mesa y como sin decir nada, aunque me gustaría platicar.' },
            { level: 3, text: 'Les pregunto si me puedo sentar y les comento algo de la clase de hoy.' },
            { level: 4, text: 'Me siento con ellos, platicamos y les propongo armar un grupo para estudiar para el parcial.' },
          ],
          level3: 'Pedir permiso para sentarse y comentar algo que comparten, como la clase de hoy.',
          why: 'Algo pequeño en común abre la plática sin presión, y les da pie a responder.',
        },
        b: {
          place: 'Biblioteca',
          text: 'En la biblioteca solo queda un lugar, en una mesa donde alguien de tu generación estudia la misma materia que tú.',
          options: [
            { level: 1, text: 'Mejor me voy a estudiar a otro lado.' },
            { level: 2, text: 'Me siento y estudio en silencio; pienso que podríamos ayudarnos, pero no lo digo.' },
            { level: 3, text: 'Me siento, le digo que estoy estudiando lo mismo y le pregunto qué tema le está costando.' },
            { level: 4, text: 'Le propongo repasar juntos y quedar otro día para seguir.' },
          ],
          level3: 'Decir que estudian lo mismo y preguntar qué tema le cuesta.',
          why: 'Mostrar algo tuyo y hacer una pregunta sincera convierte a un desconocido en compañero.',
        },
      },
      {
        id: 'r2',
        a: {
          place: 'WhatsApp de la generación',
          text: 'En el grupo de WhatsApp de la generación alguien pregunta quién va a ir al partido de la uni el viernes.',
          options: [
            { level: 1, text: 'Lo dejo en visto; nadie va a notar si contesto o no.' },
            { level: 2, text: 'Me dan ganas de ir, pero no contesto.' },
            { level: 3, text: 'Contesto que me late ir y pregunto a qué hora se juntan.' },
            { level: 4, text: 'Contesto que voy y propongo vernos antes en la entrada para llegar juntos.' },
          ],
          level3: 'Decir que le interesa ir y preguntar a qué hora se juntan.',
          why: 'Compartir un gusto, aunque sea en un mensaje, es una forma de dejarte ver. La pregunta te mete a la conversación.',
        },
        b: {
          place: 'Grupo de tu clase',
          text: 'En el grupo de tu clase alguien manda un meme de una serie que te encanta y varios reaccionan.',
          options: [
            { level: 1, text: 'No reacciono; mejor no meterme.' },
            { level: 2, text: 'Pienso "yo también la veo", pero solo lo leo.' },
            { level: 3, text: 'Contesto que también la veo y pregunto en qué temporada van.' },
            { level: 4, text: 'Contesto que la veo y propongo juntarnos a ver el siguiente capítulo.' },
          ],
          level3: 'Contar que también la ve y preguntar en qué temporada van.',
          why: 'Un gusto compartido es el pretexto perfecto para empezar a platicar.',
        },
      },
      {
        id: 'r3',
        a: {
          place: 'Laboratorio',
          text: 'En el laboratorio te toca con un equipo que ya se conoce. Te sientes nervioso y ellos platican entre sí.',
          options: [
            { level: 1, text: 'Hago mi parte en silencio y espero a que termine la práctica.' },
            { level: 2, text: 'Noto que estoy nervioso y que quiero integrarme, pero no digo nada.' },
            { level: 3, text: 'Les digo que estoy algo nervioso porque es mi primera vez con ellos y les pregunto cómo se reparten el trabajo.' },
            { level: 4, text: 'Me presento, propongo cómo repartir la práctica y los invito a hacer el reporte juntos en la cafetería.' },
          ],
          level3: 'Decir cómo se siente ("estoy algo nervioso") y preguntar cómo se organizan.',
          why: 'Nombrar lo que sientes baja la tensión y casi siempre genera empatía. Es autoconocimiento en acción.',
        },
        b: {
          place: 'Evento de bienvenida',
          text: 'En el evento de bienvenida de tu facultad te ponen en una dinámica con personas que no conoces y te sientes fuera de lugar.',
          options: [
            { level: 1, text: 'Me salgo con cualquier pretexto antes de que empiece.' },
            { level: 2, text: 'Me quedo; sé que me siento fuera de lugar, pero no lo digo y casi no participo.' },
            { level: 3, text: 'Les comento que no conozco a nadie, cuento algo que me gusta y les pregunto de qué carrera son.' },
            { level: 4, text: 'Me presento con todos, propongo una idea para la dinámica y al final los invito a seguir la plática.' },
          ],
          level3: 'Contar que no conoce a nadie, compartir un gusto y hacer una pregunta.',
          why: 'Lo más probable es que alguien más se sienta igual. Decirlo los acerca.',
        },
      },
    ],
  },

  models: {
    eyebrow: 'Personas que se conocen',
    title: '¿De quién quieres aprender?',
    body: 'Lee las tres y elige una.',
    choose: 'Elegir',
    chosen: 'Elegida',
    learnTitle: (name) => `¿Qué aprendes de ${name}?`,
    learnHint: 'Una o dos frases bastan.',
    people: [
      {
        id: 'olivia',
        name: 'Olivia Rodrigo',
        tag: 'Autoconocimiento emocional',
        summary:
          'Pasó de actriz juvenil a estrella pop casi de la noche a la mañana, con mucha presión y críticas que minimizaban lo que sentía por ser adolescente. En lugar de esconder sus emociones, buscó terapia desde joven y las convirtió en canciones honestas.',
        question: '¿Qué emoción tuya te cuesta reconocer o decir en voz alta?',
        // TODO(equipo): pegar fuentes verificables (APA) de estas afirmaciones.
        sources: [],
        sourcesTodo: 'Fuente: que va a terapia desde los 16 años (entrevista) y sus premios Grammy.',
      },
      {
        id: 'zendaya',
        name: 'Zendaya',
        tag: 'Autoconocimiento de límites',
        summary:
          'A los 18 años le ofrecieron protagonizar una nueva serie de Disney. En vez de aceptar todo por miedo, tuvo claro quién era y qué quería representar: pidió ser coproductora, cambiar el nombre del programa y que la familia protagonista fuera afrodescendiente.',
        question: '¿En qué situación te gustaría poner un límite o decir lo que quieres?',
        sources: [],
        sourcesTodo: 'Fuente: sus condiciones para K.C. Undercover (coproducción, nombre, familia afrodescendiente).',
      },
      {
        id: 'wang',
        name: 'Alexandr Wang',
        tag: 'Autoconocimiento de convicción',
        summary:
          'A los 19 años dejó el MIT para fundar Scale AI, una decisión que mucha gente a su alrededor veía como una locura. Para decidir, se alejó del ruido y revisó con honestidad sus capacidades y lo que creía. Lo llama su "brújula interna".',
        question: '¿Qué decisión te gustaría tomar escuchando más tu propia brújula?',
        sources: [],
        sourcesTodo: 'Fuente: salida del MIT, fundación de Scale AI y su idea de "brújula interna".',
      },
    ],
  },

  testimonials: {
    eyebrow: 'A mí también me pasó',
    title: 'Lo que dijeron otros alumnos de primer semestre',
    origin: 'Alumno de primer semestre · diagnóstico del equipo',
    closing: 'Si te identificaste con alguno, no estás solo. Y ya diste un paso: estás aquí.',
    items: [
      'Me da miedo que me rechacen porque ya tienen un grupo definido.',
      'Casi siempre pienso que no encajaré.',
      'Creo que no tengo nada interesante que compartir para pertenecer.',
    ],
  },
}
