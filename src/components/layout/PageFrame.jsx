import { Cloud } from '../scenery/Cloud'
import { DesktopBackdrop } from '../scenery/DesktopBackdrop'

/**
 * Columna de contenido común (recorrido, landing y referencias).
 * Celular: página a lo ancho con una nube. lg: tarjeta sobre el paisaje del módulo en el fondo.
 */
export function PageFrame({ scene, className = '', children }) {
  return (
    <div
      className={`relative mx-auto flex min-h-dvh w-full max-w-xl flex-col overflow-x-clip px-5 pt-[max(1.25rem,env(safe-area-inset-top))] lg:my-10 lg:min-h-[calc(100dvh-5rem)] lg:rounded-[2.5rem] lg:bg-paper lg:pt-7 lg:shadow-[0_30px_80px_-30px_oklch(0.3_0.06_125/0.55)] ${className}`}
    >
      <DesktopBackdrop key={`fondo-${scene}`} scene={scene} />
      <Cloud key={scene} scene={scene} width={150} className="drift absolute top-20 -right-8 opacity-90 lg:hidden" />
      {children}
    </div>
  )
}
