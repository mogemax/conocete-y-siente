// Módulo 1 · Enganche (responsable: Esteban Amezcua)

export const M1 = {
  consent: {
    title: 'Antes de *empezar*',
    body: 'Tus respuestas escritas se quedan en tu celular. Solo enviamos números anónimos (sin nombre) para mejorar la experiencia.',
    adult: 'Soy mayor de edad y quiero participar.',
    participantQuestion: '¿Cómo llegaste aquí?',
    participants: [
      { key: 'companero', label: 'Soy compañero de clase', sub: 'Desarrollo de Competencias Personales' },
      { key: 'externo', label: 'Soy universitario externo', sub: 'Me compartieron la liga' },
    ],
  },
  agreements: {
    title: 'Nuestros acuerdos',
    items: [
      { title: 'Es privado', body: 'Lo que escribes se queda en tu dispositivo.' },
      { title: 'No hay respuestas correctas', body: 'Solo hay lo que es cierto para ti hoy.' },
      { title: 'Casi todo se puede saltar', body: 'Te marcamos lo único que se necesita para tu constancia.' },
    ],
  },
  checkin: {
    title: '¿Cómo llegas hoy?',
    body: 'Toca la emoción que más se parece a lo que sientes.',
    emotions: [
      { key: 'alegria', label: 'Alegría' },
      { key: 'calma', label: 'Calma' },
      { key: 'curiosidad', label: 'Curiosidad' },
      { key: 'nervios', label: 'Nervios' },
      { key: 'miedo', label: 'Miedo' },
      { key: 'tristeza', label: 'Tristeza' },
      { key: 'enojo', label: 'Enojo' },
    ],
    otherLabel: 'Otra',
    otherPlaceholder: 'Escribe tu emoción',
    likeLabel: 'Un gusto de hoy',
    likePlaceholder: 'Algo que disfrutaste o te gustó hoy, aunque sea pequeño',
  },
}
