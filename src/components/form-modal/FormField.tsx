'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
}

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

export function FormField({ id, label, registration, error }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { ref: registrationRef, ...rest } = registration

  const setRef = useCallback(
    (el: HTMLTextAreaElement | null) => {
      textareaRef.current = el
      registrationRef(el)
    },
    [registrationRef],
  )

  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current)
    }
  }, [])

  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-500">
        {label}
      </label>
      <textarea
        id={id}
        {...rest}
        ref={setRef}
        rows={1}
        className="mt-1 w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none overflow-hidden"
        onInput={(e) => autoResize(e.currentTarget)}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  )
}
