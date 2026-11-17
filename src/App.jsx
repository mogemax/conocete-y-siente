import { UI } from './content'
import { useStore } from './state/store'
import { Shell } from './components/layout/Shell'
import { useNavigation, moduleFractions } from './flow/useNavigation'
import { useAutoSubmit } from './flow/useAutoSubmit'
import { openPage, usePage } from './flow/pages'
import { Landing } from './screens/Landing'
import { References } from './screens/References'

/** Tres páginas según el hash: #/ (landing), #/referencias y los pasos del recorrido. */
export default function App() {
  const page = usePage()
  useAutoSubmit()
  if (page === 'landing') return <Landing />
  if (page === 'referencias') return <References />
  return <Flow />
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
