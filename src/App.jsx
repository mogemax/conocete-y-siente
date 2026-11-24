import { useEffect } from 'react'
import { UI } from './content'
import { useStore } from './state/store'
import { Shell } from './components/layout/Shell'
import { useNavigation, moduleFractions } from './flow/useNavigation'
import { numeralsAt } from './flow/numerals'
import { useAutoSubmit } from './flow/useAutoSubmit'
import { openPage, usePage } from './flow/pages'
import { Landing } from './screens/Landing'
import { Camino, Historias, Nosotros } from './screens/SitePages'
import { References } from './screens/References'

// Páginas del sitio (ver flow/pages.js); cualquier otro hash es un paso del recorrido.
const PAGES = { inicio: Landing, camino: Camino, historias: Historias, nosotros: Nosotros, referencias: References }

export default function App() {
  const page = usePage()
  useAutoSubmit()
  // Con llaves: scrollTo devuelve una Promise en Chrome reciente y React la tomaría como limpieza del efecto.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])
  const Page = PAGES[page]
  return Page ? <Page /> : <Flow />
}

function Flow() {
  const { state, reset } = useStore()
  const { index, step, next, back, goto } = useNavigation()

  const canNext = !step.required || step.required(state)
  const nextLabel = step.isEmpty?.(state) ? UI.skip : (step.nextLabel ?? UI.next)

  return (
    <Shell
      step={step}
      fractionByModule={moduleFractions(index)}
      numerals={numeralsAt(index)}
      canBack={index > 0}
      canNext={canNext}
      nextLabel={nextLabel}
      onBack={back}
      onNext={next}
      onReset={() => {
        reset()
        openPage('')
      }}
    >
      {step.render({ next, goto })}
    </Shell>
  )
}
