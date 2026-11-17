import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

/** Página del sitio a todo lo ancho: barra superior, contenido y pie. */
export function SiteLayout({ current, children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader current={current} />
      <main id="contenido" tabIndex={-1} key={current} className="screen-in flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
