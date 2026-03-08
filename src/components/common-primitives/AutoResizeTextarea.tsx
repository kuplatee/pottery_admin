'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  registration: UseFormRegisterReturn
  placeholder?: string
  className?: string
}

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

export function AutoResizeTextarea({ registration, placeholder, className = '' }: Props) {
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
    <textarea
      {...rest}
      ref={setRef}
      rows={1}
      placeholder={placeholder}
      className={`w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none overflow-hidden ${className}`.trim()}
      onInput={(e) => autoResize(e.currentTarget)}
    />
  )
}
