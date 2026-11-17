import { useEffect, useState, useSyncExternalStore } from 'react'
import { SITE } from '../../content'
import { useStart } from '../../flow/useStart'
import { Accent } from '../ui/Accent'
import { Button } from '../ui/Button'

const subscribeScroll = (cb) => {
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}
const useScrolled = () =>
  useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  )

/** Barra superior del sitio: marca, páginas y botón principal (cta: no dentro del recorrido). En celular las páginas van en un menú. */
export function SiteHeader({ current, cta = true, className = '' }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const { label, start } = useStart()
  const solid = scrolled || open

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const link = (item, extra = '') => (
    <a
      key={item.id}
      href={`#/${item.id}`}
      onClick={() => setOpen(false)}
      aria-current={current === item.id ? 'page' : undefined}
      className={`rounded-full px-3.5 py-2 font-semibold text-ink-soft transition-colors hover:text-ink aria-[current=page]:bg-accent-soft aria-[current=page]:text-leaf-ink ${extra}`}
    >
      {item.label}
    </a>
  )

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,box-shadow] duration-300 ${
        solid ? 'bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : ''
      } ${className}`}
    >
      {/* Botón y no enlace: un href="#contenido" cambiaría la ruta (el sitio usa el hash) */}
      <button
        type="button"
        onClick={() => document.getElementById('contenido')?.focus()}
        className="sr-only z-40 rounded-full bg-accent px-5 py-3 font-semibold text-card focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {SITE.skip}
      </button>
      <div className="site-container flex h-16 items-center gap-4">
        <a href="#/" className="font-display text-lg font-medium whitespace-nowrap [&_em]:text-accent [&_em]:italic">
          <Accent text={SITE.brand} />
        </a>
        <nav aria-label="Páginas" className="ml-auto hidden items-center gap-1 text-sm md:flex">
          {SITE.nav.map((item) => link(item))}
        </nav>
        {/* Envuelto: el display del botón (inline-flex) le ganaría a "hidden" */}
        {cta && (
          <div className="hidden md:block">
            <Button size="sm" onClick={start}>
              {label}
            </Button>
          </div>
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-sitio"
          aria-label={open ? SITE.closeMenu : SITE.menu}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-11 place-items-center rounded-full ring-1 ring-line md:hidden"
        >
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
            <path
              d={open ? 'M5 5l10 10M15 5L5 15' : 'M3.5 6h13M3.5 10h13M3.5 14h13'}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {open && (
        <div id="menu-sitio" className="reveal site-container flex flex-col gap-1 pt-1 pb-5 md:hidden">
          <nav aria-label="Páginas" className="flex flex-col">
            {SITE.nav.map((item) => link(item, 'py-3 text-lg'))}
          </nav>
          {cta && (
            <Button onClick={start} className="mt-2 w-full">
              {label}
            </Button>
          )}
        </div>
      )}
    </header>
  )
}
