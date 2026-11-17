import { useMemo } from 'react'
import { landscapeTileSvg } from '../../lib/scenery'

/**
 * Paisaje a todo lo ancho: el mosaico (paisaje + espejo) se repite en horizontal a la altura de la caja.
 * Sin grano: cubriría también el cielo transparente y mancharía el papel.
 */
export function WideLandscape({ scene, className = '', children }) {
  const tile = useMemo(() => `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(landscapeTileSvg(scene))}")`, [scene])
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="absolute inset-0 bg-[length:auto_100%] bg-bottom bg-repeat-x" style={{ backgroundImage: tile }} />
      {children}
    </div>
  )
}
