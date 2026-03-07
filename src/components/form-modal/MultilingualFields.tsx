import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { FormField } from './FormField'

type Props = {
  label: string
  fiRegistration: UseFormRegisterReturn
  enRegistration: UseFormRegisterReturn
  fiError?: FieldError
  enError?: FieldError
}

export function MultilingualFields({ label, fiRegistration, enRegistration, fiError, enError }: Props) {
  return (
    <>
      <p className="pt-3 text-base font-medium text-gray-700">{label}</p>
      <FormField
        id="nameFi"
        label="Finnish"
        registration={fiRegistration}
        error={fiError}
      />
      <FormField
        id="nameEn"
        label="English"
        registration={enRegistration}
        error={enError}
      />
    </>
  )
}
