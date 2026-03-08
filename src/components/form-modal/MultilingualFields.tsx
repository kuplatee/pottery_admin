import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, type Language } from '@/lib/languages'
import { FormField } from './FormField'
import { SectionTitle } from '@/components/common-primitives/SectionTitle'

type Props = {
  label: string
  registrations: Record<Language, UseFormRegisterReturn>
  errors: Partial<Record<Language, FieldError>>
}

export function MultilingualFields({ label, registrations, errors }: Props) {
  return (
    <>
      <SectionTitle>{label}</SectionTitle>
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
