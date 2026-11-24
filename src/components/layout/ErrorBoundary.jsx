import { Component } from 'react'
import { CRASH } from '../../content'
import { Button } from '../ui/Button'

/**
 * Red de seguridad: si una pantalla lanza un error, muestra un aviso con salida
 * en lugar de dejar la página en blanco. El avance vive en localStorage, así que recargar no lo pierde.
 */
export class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main role="alert" className="grid min-h-dvh place-items-center px-6 text-center">
        <div className="flex max-w-md flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-ink [font-stretch:110%]">{CRASH.title}</h1>
          <p className="text-lg text-ink-soft">{CRASH.body}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button onClick={() => window.location.reload()}>{CRASH.reload}</Button>
            {/* Sin hash: lleva a la landing por si el problema está en el paso actual. */}
            <Button variant="secondary" onClick={() => window.location.assign(window.location.pathname)}>
              {CRASH.home}
            </Button>
          </div>
        </div>
      </main>
    )
  }
}
