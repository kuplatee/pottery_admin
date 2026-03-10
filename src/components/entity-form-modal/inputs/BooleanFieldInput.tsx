import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { SectionTitle } from '@/components/common-primitives/SectionTitle'
import { ErrorMessage } from '@/components/common-primitives/ErrorMessage'

type Props = {
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
}

export function BooleanFieldInput({ label, registration, error }: Props) {
  return (
    <>
      <SectionTitle>{label}</SectionTitle>
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 accent-gray-700"
          {...registration}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
      {error?.message && <ErrorMessage message={error.message} />}
    </>
  )
}
