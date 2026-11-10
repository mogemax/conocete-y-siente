import { useId } from 'react'

/** Campo de texto multilínea con etiqueta y pista. */
export function TextField({ label, hint, value, onChange, placeholder, rows = 4, labelClassName = '', ...rest }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className={`font-bold ${labelClassName}`}>
          {label}
        </label>
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-[0.95rem] text-ink-soft">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        maxLength={800}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-2xl bg-card p-4 text-[1.0625rem] ring-1 ring-line transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-clay focus:outline-none"
        {...rest}
      />
    </div>
  )
}
