// Textos generales de la interfaz (botones, pie de página, mensajes compartidos).

// Muestra en pantalla las etiquetas "Pendiente" de los TODO del contenido.
// Cámbialo a false cuando el equipo haya llenado todo.
export const SHOW_TODOS = true

export const UI = {
  appName: 'Conócete y siente',
  next: 'Siguiente',
  skip: 'Saltar por ahora',
  back: 'Atrás',
  continue: 'Continuar',
  start: 'Empezar',
  required: 'Necesaria para tu constancia',
  autosave: 'Tu avance se guarda solo en este dispositivo.',
  moduleOf: (n, total) => `Módulo ${n} de ${total}`,
  minutes: (m) => `~${m} min`,
  todoLabel: 'Pendiente',
}

export const SUPPORT = {
  link: '¿Te sientes muy mal? Habla con alguien de confianza o con los servicios de atención psicológica de tu universidad.',
  title: 'No tienes que pasarlo solo',
  body: 'Si algo de lo que estás sintiendo pesa demasiado, busca a una persona de confianza o a los servicios de atención psicológica de tu universidad.',
  // TODO(equipo): teléfono, correo, ubicación y horario del servicio de atención psicológica de la UP.
  contact: '',
  contactTodo: 'Contacto del servicio de atención psicológica de la UP (teléfono, correo, horario).',
  close: 'Cerrar',
}

// Pantalla de respaldo si algo falla al dibujar la app (ver ErrorBoundary). Tu avance sigue guardado.
export const CRASH = {
  title: 'Algo se atoró',
  body: 'Tu avance sigue guardado en este dispositivo. Recarga para continuar donde te quedaste.',
  reload: 'Recargar',
  home: 'Ir al inicio',
}

export const RESET = {
  link: 'Borrar mis respuestas',
  confirm: '¿Seguro? Se borra todo tu avance en este dispositivo.',
  yes: 'Sí, borrar todo',
  no: 'Mejor no',
}
