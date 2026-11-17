// Textos del sitio: barra superior, pie y las páginas fuera del recorrido. *Acento* entre asteriscos.

export const SITE = {
  brand: 'Conócete y *siente*',
  // id = lo que va después de #/ en la URL ('' = inicio).
  nav: [
    { id: '', label: 'Inicio' },
    { id: 'camino', label: 'El camino' },
    { id: 'historias', label: 'Historias' },
    { id: 'nosotros', label: 'Nosotros' },
  ],
  start: 'Empezar',
  resume: 'Continuar donde te quedaste',
  menu: 'Menú',
  skip: 'Saltar al contenido',
  closeMenu: 'Cerrar menú',
  footer: {
    course: 'Desarrollo de Competencias Personales · Universidad Panamericana',
    team: 'Equipo: Esteban Amezcua, Nadia Villegas y Esteban Montes',
    references: 'Referencias',
  },
}

export const CAMINO = {
  eyebrow: 'El camino',
  title: 'Cinco niveles, un paso a la *vez.*',
  body: 'El autoconocimiento no se tiene o no se tiene: se practica. Estos son los cinco niveles que usamos en la experiencia, del más reservado al más abierto.',
  tipLabel: 'Para subir',
  goal: {
    title: 'La meta es el *3.*',
    body: 'No buscamos que seas el alma de la fiesta. Llegar al nivel 3 significa que, en un grupo pequeño, cuentas algo que te gusta y cómo te sientes, y haces una pregunta. Con eso ya empiezan las amistades.',
  },
  measure: {
    title: 'Cómo sabes si *avanzaste.*',
    body: 'Al inicio y al final contestas lo mismo: eliges tu nivel, calificas 6 afirmaciones y resuelves 3 situaciones del campus. Al final ves tu antes y después en una gráfica.',
  },
}

export const HISTORIAS = {
  eyebrow: 'Historias',
  title: 'Personas que se *conocen.*',
  body: 'Tres historias de personas que se escucharon a sí mismas antes de decidir. En el Módulo 4 las lees completas y eliges de quién aprender.',
  cta: 'Conócelas en el recorrido',
  testimonialsTitle: 'Y alumnos como *tú.*',
}

export const NOSOTROS = {
  eyebrow: 'Nosotros',
  title: 'Quiénes *somos.*',
  body: 'Somos alumnos de Desarrollo de Competencias Personales (FHU002) en la Universidad Panamericana. Hicimos esta experiencia para quienes empiezan la universidad y sienten que los grupos ya están formados.',
  teamTitle: 'El equipo',
  team: ['Esteban Amezcua', 'Nadia Villegas', 'Esteban Montes'],
  supportTitle: 'Si necesitas *apoyo.*',
  referencesTitle: 'De dónde viene lo que *decimos.*',
  referencesBody: 'Todas las ideas y las historias tienen su fuente, en formato APA.',
  referencesCta: 'Ver referencias',
}
