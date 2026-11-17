import { MODULES } from '../../content'
import { Cloud } from './Cloud'
import { WideLandscape } from './WideLandscape'

const SLOT = 0.78 // distancia entre números, en em del tamaño del número
const MOTION = 'duration-[900ms] ease-[var(--ease-out-quart)]'

/**
 * Fondo del recorrido en escritorio: la tira de números 1-5 sale por detrás del paisaje.
 * - position: módulo + avance (ver flow/numerals.js); la tira se desliza para centrar ese punto.
 * - intro: el número del módulo pasa a primer plano (verde); en los demás pasos baja detrás de las montañas.
 * - hidden: mediciones y resultados, sin números.
 * Con "reducir movimiento" la regla global de index.css vuelve instantáneo el cambio.
 * Va al final de la página (no fijo): al desplazarse, el texto nunca pasa sobre el paisaje.
 */
export function FlowBackdrop({ scene, numerals }) {
  const { position = 0, hidden = true, intro = false } = numerals ?? {}
  const current = Math.floor(position + 1e-6)

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block">
      {/* Los números se desvanecen antes de las montañas (el paisaje es translúcido y se verían a través) */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_20vh,#000_30vh)]">
        <div
          className={`absolute bottom-[12vh] left-[70vw] flex font-display leading-[0.78] font-semibold tracking-[-0.06em] [font-stretch:120%] transition-[transform,opacity] ${MOTION} ${
            hidden ? 'opacity-0' : ''
          }`}
          style={{ fontSize: 'min(54vh, 32vw)', transform: `translateX(${-(position + 0.5) * SLOT}em)` }}
        >
          {MODULES.map((m, i) => {
            const front = intro && i === current
            return (
              <span
                key={m.id}
                className={`inline-block origin-bottom text-center transition-[color,transform] ${MOTION} ${
                  front
                    ? 'text-leaf'
                    : i === current
                      ? 'translate-y-[0.2em] scale-[0.86] text-lime-soft'
                      : 'translate-y-[0.2em] scale-[0.86] text-lime-faint'
                }`}
                style={{ width: `${SLOT}em` }}
              >
                {m.n}
              </span>
            )
          })}
        </div>
      </div>
      <div key={scene} className="screen-in absolute inset-x-0 bottom-0">
        <WideLandscape scene={scene} className="h-[26vh]" />
      </div>
      <Cloud scene={scene} width={160} className="drift absolute top-[22vh] right-[3vw] hidden min-[90rem]:block" />
    </div>
  )
}
