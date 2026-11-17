import { SITE } from '../../content'
import { SupportNote } from '../layout/SupportNote'

/** Pie de las páginas del sitio. */
export function SiteFooter() {
  const t = SITE.footer
  return (
    <footer className="border-t border-line">
      <div className="site-container grid gap-6 py-10 text-sm text-ink-soft md:grid-cols-[1fr_auto] md:items-start">
        <div className="flex flex-col gap-2">
          <p>{t.course}</p>
          <p>{t.team}</p>
          <a href="#/referencias" className="w-fit font-semibold text-accent underline underline-offset-4">
            {t.references}
          </a>
        </div>
        <div className="max-w-md">
          <SupportNote />
        </div>
      </div>
    </footer>
  )
}
