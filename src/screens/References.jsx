import { leavePage } from '../flow/pages'
import { PageFrame } from '../components/layout/PageFrame'
import { Accent } from '../components/ui/Accent'
import { Button } from '../components/ui/Button'
import { Heading } from '../components/ui/Heading'
import { REFERENCES } from '../content'

/** Lista completa en APA 7 (sangría francesa). Se abre desde la landing y desde "Para seguir aprendiendo". */
export function References() {
  const t = REFERENCES
  return (
    <PageFrame scene="atardecer">
      <main className="screen-in flex flex-1 flex-col gap-7 pt-6 pb-12">
        <Button variant="secondary" size="sm" onClick={leavePage} className="w-fit gap-1.5">
          <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
            <path d="M12.5 4.5L7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.back}
        </Button>
        <Heading title={t.title} body={t.body} />
        <ol className="flex flex-col gap-4">
          {t.items.map((r) => (
            <li key={r.apa} className="pl-8 -indent-8 text-[0.95rem] leading-relaxed text-ink [&_em]:text-ink">
              <Accent text={r.apa} />
              {r.url && (
                <>
                  {' '}
                  <a href={r.url} target="_blank" rel="noreferrer" className="break-all text-accent underline decoration-accent/30 underline-offset-2">
                    {r.url}
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </main>
    </PageFrame>
  )
}
