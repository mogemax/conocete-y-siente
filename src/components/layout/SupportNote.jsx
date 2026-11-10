import { useState } from 'react'
import { SUPPORT } from '../../content'
import { Todo } from '../ui/Todo'

/** Mensaje fijo de apoyo en el pie de todas las pantallas. Se despliega en línea, sin modal. */
export function SupportNote() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-left text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
      >
        {SUPPORT.link}
      </button>
      {open && (
        <div className="reveal flex flex-col gap-2 rounded-2xl bg-leaf-soft p-4 text-leaf-ink">
          <p className="font-display text-lg font-semibold">{SUPPORT.title}</p>
          <p>{SUPPORT.body}</p>
          {SUPPORT.contact ? <p className="font-semibold">{SUPPORT.contact}</p> : <Todo>{SUPPORT.contactTodo}</Todo>}
        </div>
      )}
    </div>
  )
}
