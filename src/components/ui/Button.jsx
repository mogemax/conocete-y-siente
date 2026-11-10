const VARIANTS = {
  primary:
    'bg-clay text-card shadow-[0_1px_0_oklch(0.4_0.1_36)] hover:bg-clay-deep active:scale-[0.98] disabled:bg-line disabled:text-ink-faint disabled:shadow-none',
  secondary: 'bg-card text-ink ring-1 ring-line hover:ring-ink-faint active:scale-[0.98]',
  ghost: 'text-ink-soft hover:text-ink underline-offset-4 hover:underline',
}

export function Button({ variant = 'primary', className = '', ...props }) {
  const size = variant === 'ghost' ? 'min-h-11 px-2' : 'min-h-14 px-6 rounded-2xl text-lg font-bold'
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 transition-[background-color,transform,box-shadow] duration-200 ease-out disabled:cursor-not-allowed ${size} ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
