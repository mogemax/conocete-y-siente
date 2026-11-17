/**
 * Pantalla en dos columnas desde lg: contexto a la izquierda (título, pregunta) y acción a la derecha
 * (opciones, campos, retro). En celular se apila en el mismo orden.
 */
export function Split({ context, children }) {
  return (
    <div className="flex flex-col gap-7 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14">
      <div className="flex flex-col gap-7">{context}</div>
      {children && <div className="flex flex-col gap-7">{children}</div>}
    </div>
  )
}
