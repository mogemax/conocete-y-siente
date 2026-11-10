import { UI } from './content'
import { useStore } from './state/store'
import { Shell } from './components/layout/Shell'
import { useNavigation, moduleFractions } from './flow/useNavigation'
import { useAutoSubmit } from './flow/useAutoSubmit'

export default function App() {
  const { state, reset } = useStore()
  const { index, step, next, back, goto } = useNavigation()
  useAutoSubmit()

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
        window.history.replaceState(null, '', '#/bienvenida')
      }}
    >
      {step.render({ next, goto })}
    </Shell>
  )
}
