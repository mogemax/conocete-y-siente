import { useMemo } from 'react'
import { cloudSvg } from '../../lib/scenery'

export function Cloud({ scene, width = 220, className = '' }) {
  const svg = useMemo(() => cloudSvg(scene, { width }), [scene, width])
  return <div aria-hidden className={`pointer-events-none ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />
}
