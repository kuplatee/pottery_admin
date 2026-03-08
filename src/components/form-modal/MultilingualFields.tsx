import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, type Language } from '@/lib/languages'
import { FormField } from './FormField'

type Props = {
  label: string
  registrations: Record<Language, UseFormRegisterReturn>
  errors: Partial<Record<Language, FieldError>>
}

export function MultilingualFields({ label, registrations, errors }: Props) {
  return (
    <>
      <p className="pt-3 text-base font-medium text-gray-700">{label}</p>
      {SUPPORTED_LANGUAGES.map(lang => (
        <FormField
          key={lang}
          id={`${label}-${lang}`}
          label={LANGUAGE_LABELS[lang]}
          registration={registrations[lang]}
          error={errors[lang]}
        />
      ))}
    </>
  )
}
