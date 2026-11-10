/** Superficie tipo boleto con muescas laterales (niveles y constancia). */
export function Ticket({ className = '', notchAt = '50%', children }) {
  return (
    <div className={`ticket ${className}`} style={{ '--notch-y': notchAt }}>
      {children}
    </div>
  )
}
