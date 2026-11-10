// Módulo 5 · Mide y comprométete (responsable: Esteban Montes)

export const M5 = {
  intro: {
    title: 'Mide y *comprométete*',
    body: 'Vuelves a contestar lo del inicio, comparas, y te llevas un plan de 4 semanas y tu constancia.',
  },

  comparison: {
    eyebrow: 'Antes y después',
    title: 'Mira cómo *cambiaste*',
    before: 'Antes',
    after: 'Después',
    metrics: {
      level: { label: 'Nivel que elegiste', max: 5 },
      statements: { label: 'Promedio de afirmaciones', max: 5 },
      situations: { label: 'Nivel en situaciones', max: 4 },
    },
    messages: {
      up: 'Subiste. Conocerte mejor ya se nota en cómo respondes. Ahora toca llevarlo al campus.',
      same: 'Te mantuviste. El cambio real se nota con práctica, y para eso es tu plan.',
      down: 'A veces, al conocernos mejor, nos calificamos con más honestidad. Eso también es autoconocimiento.',
    },
  },

  area: {
    title: 'Un área que quiero trabajar',
    body: 'Mirando tu comparación, ¿qué te gustaría mejorar?',
    placeholder: 'Por ejemplo: animarme a contar lo que me gusta.',
  },

  ifThen: {
    title: 'Tu compromiso',
    body: 'Escríbelo como "Si pasa esto, entonces hago esto otro". Así sabes exactamente cuándo actuar.',
    ifLabel: 'Si…',
    thenLabel: 'entonces…',
    ifPlaceholder: 'alguien de mi salón menciona algo que me gusta',
    thenPlaceholder: 'le digo que a mí también y le pregunto algo',
    examples: [
      'Si llego a clase y hay un lugar junto a alguien nuevo, entonces me siento ahí y lo saludo.',
      'Si me siento nervioso en un equipo, entonces lo digo y pregunto cómo nos organizamos.',
    ],
    examplesTitle: 'Ejemplos',
  },

  plan: {
    title: 'Tu plan de 4 semanas',
    body: (levelName) => `Una acción pequeña por semana para subir desde ${levelName}. Puedes editarlas.`,
    week: (n) => `Semana ${n}`,
    tipTitle: 'El tip de tu nivel',
  },

  prompt: {
    title: 'Sigue con ayuda de la IA',
    body: 'Copia este prompt y pégalo en tu asistente de IA favorito para armar un plan más personal.',
    copy: 'Copiar prompt',
    copied: '¡Copiado!',
    // Prompt del equipo (Formato 1, sección I) + "Si…, entonces…", recursos, autores y "cita tus fuentes".
    // {nivel}, {nombreNivel} y {area} se llenan con las respuestas del usuario.
    template: `Actúa como un guía de autoconocimiento para estudiantes de primer semestre universitario. Mi objetivo es conocerme mejor para hacer nuevas amistades en mi universidad. No des diagnósticos ni hagas terapia.

Hoy me ubico en el nivel {nivel} ({nombreNivel}) y quiero trabajar esto: {area}

Reglas:
1. Hazme UNA pregunta a la vez, máximo 6, y espera mi respuesta antes de seguir.
2. Haz preguntas que empiecen con "qué" o "cómo", no con "por qué".
3. Pregúntame, en este orden: qué situaciones sociales de mi vida universitaria me incomodan, qué siento en esos momentos, qué cosas me gustan y se me dan bien, y cuándo fue la última vez que me sentí cómodo con otras personas.
4. Con mis respuestas, ubícame en esta escala y explícame en dos líneas por qué:
1 Evita: me quedo en silencio y espero a que me busquen.
2 Reconoce: sé lo que siento y me gusta, pero lo guardo.
3 Comparte: en un grupo pequeño cuento un gusto y cómo me siento, y pregunto algo.
4 Conecta: inicio conversaciones y propongo planes.
5 Sostiene: mantengo amistades y digo mi opinión con respeto.
5. Arma un plan de 4 semanas con una acción pequeña por semana para subir un nivel, con ejemplos que pueda hacer en mi campus. Escribe cada acción con el formato "Si [situación], entonces [acción]".
6. Apóyate en estos autores: Albert Bandura (autoeficacia), Nathaniel Branden (autoestima), Tasha Eurich (autoconocimiento), Kristin Neff (autocompasión) y Brené Brown (vulnerabilidad). Cuando sea útil, recomiéndame alguno de estos recursos: la charla "The power of vulnerability" de Brené Brown, el artículo "What self-awareness really is (and how to cultivate it)" de Tasha Eurich, los ejercicios de Self-Compassion.org de Kristin Neff, el episodio con Tasha Eurich del podcast "How to Be a Better Human" de TED y "CONÓCETE Podcast" con Andrea Vargas.
7. Cita tus fuentes. Si no estás seguro de algo, dilo en lugar de inventarlo.
8. Cierra preguntándome qué tan realista me parece el plan y qué cambiaría.

Si lo que te cuento suena a crisis o a mucho malestar, deja el plan y dime con calidez que busque apoyo en los servicios de atención psicológica de mi universidad o en una persona de confianza.`,
    areaFallback: '(todavía no lo sé)',
  },

  resources: {
    title: 'Para seguir aprendiendo',
    levelLabel: 'Te sirve más en',
    items: [
      {
        title: 'The power of vulnerability',
        author: 'Brené Brown · TEDxHouston (video)',
        description: 'Lo que descubrió estudiando la conexión humana y por qué mostrarse tal como uno es abre la puerta a pertenecer.',
        url: 'https://www.ted.com/talks/brene_brown_on_vulnerability',
        levels: 'niveles 1 y 2',
      },
      {
        title: 'What self-awareness really is (and how to cultivate it)',
        author: 'Tasha Eurich · Harvard Business Review (artículo)',
        description: 'Distingue entre conocerse por dentro y saber cómo nos ven los demás, y explica cómo trabajar ambas.',
        // TODO(equipo): verificar que la liga abre.
        url: 'https://hbr.org/2018/01/what-self-awareness-really-is-and-how-to-cultivate-it',
        levels: 'niveles 3 y 4',
      },
      {
        title: 'Self-Compassion.org: ejercicios',
        author: 'Kristin Neff (ejercicios)',
        description: 'Prácticas para tratarte con amabilidad al equivocarte, como imaginar cómo tratarías a un amigo.',
        // TODO(equipo): liga directa a la página de ejercicios.
        url: 'https://self-compassion.org/',
        levels: 'nivel 5 (y cualquiera)',
      },
      {
        title: 'How to tap into your self-awareness',
        author: 'Tasha Eurich · How to Be a Better Human, TED (podcast)',
        description: 'Qué es la autoconciencia y por qué conviene preguntar a otras personas cómo nos ven.',
        url: '',
        urlTodo: 'Liga al episodio del podcast de TED.',
        levels: 'niveles 3 y 4',
      },
      {
        title: 'CONÓCETE Podcast',
        author: 'Andrea Vargas · MVS Radio (podcast)',
        description: 'Conversaciones con especialistas sobre autoconocimiento y bienestar.',
        url: '',
        urlTodo: 'Liga al podcast en Spotify.',
        levels: 'niveles 1 y 2',
      },
    ],
  },

  certificate: {
    title: 'Tu constancia',
    lockedTitle: 'Te falta poquito',
    lockedBody: 'Para generar tu constancia necesitas:',
    missing: {
      pre: 'Contestar la medición inicial (Módulo 1)',
      post: 'Contestar la medición final (Módulo 5)',
      area: 'Escribir el área que quieres trabajar',
      ifThen: 'Escribir tu compromiso "Si…, entonces…"',
    },
    goTo: 'Ir',
    nameLabel: 'Tu nombre, como quieres que aparezca',
    namePrivacy: 'Tu nombre no se envía a ningún lado; solo se usa para tu imagen.',
    generate: 'Generar constancia',
    download: 'Descargar JPG',
    saveHint: 'Si no se descarga, mantén presionada la imagen para guardarla.',
    // Textos dibujados en la imagen.
    image: {
      brand: 'Conócete y siente',
      kind: 'Constancia de participación',
      intro: 'Se otorga a',
      body: 'por completar la experiencia de autoconocimiento',
      level: (n, name) => `Nivel alcanzado: ${n} · ${name}`,
      footer: 'Desarrollo de Competencias Personales · Universidad Panamericana',
    },
  },

  survey: {
    eyebrow: 'Opcional',
    title: 'Ayúdanos a mejorar',
    body: 'Es anónimo y nos sirve muchísimo. Estas respuestas sí se envían al equipo, sin tu nombre.',
    usefulness: '¿Qué tan útil te fue?',
    usefulnessMin: 'Nada',
    usefulnessMax: 'Muchísimo',
    learned: '¿Qué aprendiste?',
    different: '¿Qué vas a hacer distinto esta semana?',
    improve: '¿Qué mejorarías?',
    send: 'Enviar',
    sent: '¡Gracias! Lo recibimos.',
  },

  thanks: {
    title: 'Gracias por darte este *tiempo.*',
    body: 'Conocerte es el primer paso. El siguiente es compartir algo tuyo con una persona esta semana.',
    community: {
      title: 'Únete a la comunidad',
      body: 'Un espacio para practicar con otros alumnos que están en lo mismo.',
      // TODO(equipo): cuando exista la comunidad, pega aquí la liga y se mostrará sola.
      url: '',
      cta: 'Quiero unirme',
    },
    restart: 'Volver al inicio',
  },
}
