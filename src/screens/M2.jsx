import { useStore } from '../state/store'
import { Heading } from '../components/ui/Heading'
import { Pill } from '../components/ui/Pill'
import { SidePanel } from '../components/layout/SidePanel'
import { Choice } from '../components/ui/Choice'
import { Todo } from '../components/ui/Todo'
import { SwipeCards } from '../components/blocks/SwipeCards'
import { M2 } from '../content'

export function Lesson() {
  const t = M2.lesson
  return (
    <>
      <Pill>{t.eyebrow}</Pill>
      <SwipeCards
        label="Micro-lección"
        hint={t.hint}
        items={t.cards}
        renderItem={(card, i) => (
          <article className="flex h-full min-h-72 flex-col gap-4 rounded-3xl bg-card p-6 ring-1 ring-line">
            <span aria-hidden className="font-display text-5xl font-semibold text-accent-soft">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="text-2xl font-semibold">{card.title}</h2>
            <p className="text-ink-soft">{card.body}</p>
            {card.source && <p className="mt-auto text-sm text-ink-faint">{card.source}</p>}
          </article>
        )}
      />
    </>
  )
}

export function Video() {
  const t = M2.video
  return (
    <>
      <Heading title={t.title} body={t.body} />
      {t.url ? (
        <div className="aspect-video overflow-hidden rounded-3xl bg-ink">
          <iframe
            src={t.url}
            title={t.title}
            className="size-full"
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <Todo>{t.urlTodo}</Todo>
      )}
    </>
  )
}

export function QuizStep({ index }) {
  const { state, set } = useStore()
  const q = M2.quiz.questions[index]
  const answer = state.quiz[q.id]
  const answered = answer != null
  const right = answer === q.correct
  return (
    <>
      <Pill>
        {M2.quiz.eyebrow} · {M2.quiz.counter(index + 1, M2.quiz.questions.length)}
      </Pill>
      <h1 id={q.id} className="text-[1.6rem] font-semibold">
        {q.question}
      </h1>
      <Choice
        labelledBy={q.id}
        disabled={answered}
        options={q.options.map((label, i) => ({ key: i, label }))}
        value={answer}
        onChange={(i) => set(['quiz', q.id], i)}
      />
      {answered && (
        <SidePanel>
          <p
            role="status"
            className={`reveal rounded-[1.25rem] p-4 font-semibold ${right ? 'bg-leaf-soft text-leaf-ink' : 'bg-l4 text-l4-ink'}`}
          >
            {right ? q.right : q.retry}
          </p>
        </SidePanel>
      )}
    </>
  )
}
