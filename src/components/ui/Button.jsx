const VARIANTS = {
  primary:
    'bg-accent text-card shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_6px_16px_-8px_oklch(0.36_0.09_125/0.7)] hover:bg-accent-deep active:scale-[0.98] disabled:bg-line disabled:text-ink-faint disabled:shadow-none',
  secondary: 'bg-card text-ink ring-1 ring-line hover:ring-ink-faint active:scale-[0.98]',
  ghost: 'text-ink-soft hover:text-ink underline-offset-4 hover:underline',
}

const SIZES = {
  md: 'min-h-14 px-7 rounded-full text-lg font-semibold [font-stretch:110%]',
  sm: 'min-h-11 px-4 rounded-full font-semibold',
  icon: 'size-14 shrink-0 rounded-full',
}

export function Button({ variant = 'primary', size: sizeName = 'md', className = '', ...props }) {
  const size = variant === 'ghost' ? 'min-h-11 px-2' : SIZES[sizeName]
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 transition-[background-color,transform,box-shadow] duration-200 ease-out disabled:cursor-not-allowed ${size} ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
