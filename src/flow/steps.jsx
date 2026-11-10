// Guion de la experiencia: el orden de las pantallas vive solo aquí.
// Cada paso: { id, module, render({ next, goto }), required?(state), isEmpty?(state), nextLabel?, final? }
// - required: bloquea "Siguiente" hasta cumplirse y muestra la etiqueta "Necesaria para tu constancia".
// - isEmpty: en pasos opcionales cambia el botón a "Saltar por ahora".

import { M1, M2, M3, M4, M5, STATEMENTS, MEASUREMENT_SITUATIONS } from '../content'
import { TextScreen, FieldScreen } from '../screens/Common'
import { Welcome, Consent, Agreements, Checkin } from '../screens/M1'
import { LevelStep, StatementStep, SituationStep, ResultStep } from '../screens/Instrument'
import { Lesson, Video, QuizStep } from '../screens/M2'
import { Values, Strengthen, Closing } from '../screens/M3'
import { GameStep, Models, Testimonials } from '../screens/M4'
import { Comparison, IfThen, Plan, PromptCopy, Resources, Certificate, Survey, Thanks } from '../screens/M5'

const blank = (v) => !String(v ?? '').trim()

/** Los pasos del instrumento, idénticos antes y después. */
function instrumentSteps(module, phase, prefix) {
  const m = (s) => s.measures[phase]
  return [
    {
      id: `${prefix}-nivel`,
      module,
      required: (s) => m(s).level != null,
      render: ({ next }) => <LevelStep phase={phase} next={next} />,
    },
    ...STATEMENTS.map((_, i) => ({
      id: `${prefix}-afirmacion-${i + 1}`,
      module,
      required: (s) => m(s).statements[i] != null,
      render: ({ next }) => <StatementStep phase={phase} index={i} next={next} />,
    })),
    ...MEASUREMENT_SITUATIONS.map((sit, i) => ({
      id: `${prefix}-situacion-${i + 1}`,
      module,
      required: (s) => m(s).situations[sit.id] != null,
      render: ({ next }) => <SituationStep phase={phase} index={i} next={next} />,
    })),
    {
      id: `${prefix}-resultado`,
      module,
      render: () => <ResultStep phase={phase} />,
    },
  ]
}

export const STEPS = [
  // ── Módulo 1 · Enganche ──
  { id: 'bienvenida', module: 'm1', nextLabel: M1.welcome.cta, render: () => <Welcome /> },
  {
    id: 'consentimiento',
    module: 'm1',
    required: (s) => s.consent && s.participant != null,
    render: () => <Consent />,
  },
  { id: 'acuerdos', module: 'm1', render: () => <Agreements /> },
  {
    id: 'check-in',
    module: 'm1',
    isEmpty: (s) => s.checkin.emotion == null && blank(s.checkin.like),
    render: () => <Checkin />,
  },
  ...instrumentSteps('m1', 'pre', 'antes'),

  // ── Módulo 2 · Qué es ──
  { id: 'm2-intro', module: 'm2', render: () => <TextScreen title={M2.intro.title} body={M2.intro.body} /> },
  { id: 'm2-leccion', module: 'm2', render: () => <Lesson /> },
  { id: 'm2-video', module: 'm2', render: () => <Video /> },
  ...M2.quiz.questions.map((q, i) => ({
    id: `m2-pregunta-${i + 1}`,
    module: 'm2',
    isEmpty: (s) => s.quiz[q.id] == null,
    render: () => <QuizStep index={i} />,
  })),

  // ── Módulo 3 · Identifícala ──
  { id: 'm3-intro', module: 'm3', render: () => <TextScreen title={M3.intro.title} body={M3.intro.body} /> },
  ...M3.map.map((field, i) => ({
    id: `m3-mapa-${i + 1}`,
    module: 'm3',
    isEmpty: (s) => blank(s.map[field.key]),
    render: () => (
      <FieldScreen eyebrow={`${M3.intro.title} · ${i + 1} de ${M3.map.length}`} title={field.title} hint={field.hint} path={['map', field.key]} />
    ),
  })),
  { id: 'm3-valores', module: 'm3', isEmpty: (s) => !s.values.length && blank(s.valueOther), render: () => <Values /> },
  { id: 'm3-fortalecer', module: 'm3', isEmpty: (s) => s.strengthen == null, render: () => <Strengthen /> },
  { id: 'm3-cierre', module: 'm3', render: () => <Closing /> },

  // ── Módulo 4 · Desarróllala jugando ──
  { id: 'm4-intro', module: 'm4', render: () => <TextScreen title={M4.intro.title} body={M4.intro.body} /> },
  ...M4.game.rounds.flatMap((round, r) =>
    ['a', 'b'].map((attempt) => ({
      id: `m4-juego-${r + 1}${attempt}`,
      module: 'm4',
      required: (s) => s.game[round.id]?.[attempt] != null,
      render: () => <GameStep roundIndex={r} attempt={attempt} />,
    })),
  ),
  {
    id: 'm4-personas',
    module: 'm4',
    isEmpty: (s) => s.model.id == null && blank(s.model.learned),
    render: () => <Models />,
  },
  { id: 'm4-testimonios', module: 'm4', render: () => <Testimonials /> },

  // ── Módulo 5 · Mide y comprométete ──
  { id: 'm5-intro', module: 'm5', render: () => <TextScreen title={M5.intro.title} body={M5.intro.body} /> },
  ...instrumentSteps('m5', 'post', 'despues'),
  {
    id: 'm5-comparacion',
    module: 'm5',
    render: () => <Comparison />,
  },
  {
    id: 'm5-area',
    module: 'm5',
    required: (s) => !blank(s.area),
    render: () => <FieldScreen title={M5.area.title} hint={M5.area.body} placeholder={M5.area.placeholder} path={['area']} rows={3} />,
  },
  {
    id: 'm5-si-entonces',
    module: 'm5',
    required: (s) => !blank(s.ifThen.when) && !blank(s.ifThen.then),
    render: () => <IfThen />,
  },
  { id: 'm5-plan', module: 'm5', render: () => <Plan /> },
  { id: 'm5-prompt', module: 'm5', render: () => <PromptCopy /> },
  { id: 'm5-recursos', module: 'm5', render: () => <Resources /> },
  { id: 'm5-constancia', module: 'm5', render: ({ goto }) => <Certificate goto={goto} /> },
  {
    id: 'm5-encuesta',
    module: 'm5',
    isEmpty: (s) => !s.sent.opinion,
    render: ({ next }) => <Survey next={next} />,
  },
  { id: 'gracias', module: 'm5', final: true, render: ({ goto }) => <Thanks goto={goto} /> },
]

export const indexOfStep = (id) => STEPS.findIndex((s) => s.id === id)
export const CERTIFICATE_INDEX = indexOfStep('m5-constancia')
