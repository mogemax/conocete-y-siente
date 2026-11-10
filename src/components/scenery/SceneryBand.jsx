import { Landscape } from './Landscape'
import { GlassTiles } from './GlassTiles'
import { Grain } from './Grain'

// Tres encuadres del mismo paisaje. El dock de navegación flota sobre la parte baja de la banda.
const BANDS = {
  hero: {
    height: 'h-[21rem]',
    landscape: { mountains: true, lake: true },
    tiles: [['left', 22, 250], ['left', 72, 200], ['left', 22, 150], ['right', 22, 230], ['right', 72, 180]],
  },
  valley: { height: 'h-[17rem]', landscape: { mountains: true, lake: false }, tiles: [['right', 24, 190], ['right', 74, 140]] },
  meadow: { height: 'h-[10.5rem]', landscape: { mountains: false }, tiles: [] },
}

/** Paisaje al pie de la pantalla, a sangre, con grano y cuadros de vidrio. */
export function SceneryBand({ kind, scene }) {
  const band = BANDS[kind]
  return (
    <div aria-hidden className={`relative -mx-5 -mb-24 shrink-0 overflow-hidden lg:hidden ${band.height}`}>
      <Landscape scene={scene} {...band.landscape} className="absolute inset-0" />
      <Grain />
      <GlassTiles tiles={band.tiles} />
    </div>
  )
}
