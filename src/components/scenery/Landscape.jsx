import { useMemo } from 'react'
import { landscapeSvg } from '../../lib/scenery'

/** Paisaje vectorial anclado abajo. El SVG viene de nuestra propia función (sin datos del usuario). */
export function Landscape({ scene, mountains = true, lake = true, seed = 7, className = '' }) {
  const svg = useMemo(() => landscapeSvg(scene, { mountains, lake, seed }), [scene, mountains, lake, seed])
  return <div aria-hidden className={`pointer-events-none [&>svg]:block [&>svg]:size-full ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />
}
