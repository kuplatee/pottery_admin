'use client'

import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { AutoResizeTextarea } from '@/components/common-primitives/AutoResizeTextarea'
import { ErrorMessage } from '@/components/common-primitives/ErrorMessage'
import { LanguageLabel } from '@/components/common-primitives/LanguageLabel'

type Props = {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
}

export function FormField({ id, label, registration, error }: Props) {
  return (
    <div>
      <LanguageLabel htmlFor={id}>{label}</LanguageLabel>
      <AutoResizeTextarea registration={registration} className="mt-1" />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  )
}
