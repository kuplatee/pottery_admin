import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { FormField } from './FormField'

type Props = {
  fiRegistration: UseFormRegisterReturn
  enRegistration: UseFormRegisterReturn
  fiError?: FieldError
  enError?: FieldError
}

export function NamesFields({ fiRegistration, enRegistration, fiError, enError }: Props) {
  return (
    <>
      <p className="pt-3 text-base font-medium text-gray-700">Names</p>
      <FormField id="nameFi" label="Finnish" registration={fiRegistration} error={fiError} />
      <FormField id="nameEn" label="English" registration={enRegistration} error={enError} />
    </>
  )
}
