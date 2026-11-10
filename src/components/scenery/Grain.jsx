/** Grano sutil sobre las ilustraciones para quitarles lo plano (filtro SVG, sin imágenes). */
export function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 size-full opacity-10 mix-blend-multiply">
      <filter id="grano">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 .3  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .9 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grano)" />
    </svg>
  )
}
