import { useMemo } from 'react'
import { landscapeTileSvg } from '../../lib/scenery'
import { Cloud } from './Cloud'
import { Grain } from './Grain'

/** Solo en pantallas anchas: el paisaje del módulo en mosaico al pie de la ventana, detrás de la columna. */
export function DesktopBackdrop({ scene }) {
  const tile = useMemo(() => `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(landscapeTileSvg(scene))}")`, [scene])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden lg:block">
      <div
        className="absolute inset-x-0 bottom-0 h-[min(62vh,34rem)] bg-[length:auto_100%] bg-bottom bg-repeat-x"
        style={{ backgroundImage: tile }}
      />
      <Grain />
      <Cloud scene={scene} width={260} className="drift absolute top-[9vh] left-[7vw]" />
      <Cloud scene={scene} width={190} className="drift absolute top-[20vh] right-[9vw] [animation-delay:-4s]" />
    </div>
  )
}
