'use client'

import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  type Language
} from '@/lib/languages'
import { SectionTitle } from '@/components/common-primitives/SectionTitle'
import { AutoResizeTextarea } from '@/components/common-primitives/AutoResizeTextarea'
import { ErrorMessage } from '@/components/common-primitives/ErrorMessage'
import { LanguageLabel } from '@/components/common-primitives/LanguageLabel'

type Props = {
  label: string
  registrations: Record<Language, UseFormRegisterReturn>
  errors: Partial<Record<Language, FieldError>>
}

export function MultilingualFieldsInput({
  label,
  registrations,
  errors
}: Props) {
  return (
    <>
      <SectionTitle>{label}</SectionTitle>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <div key={lang}>
          <LanguageLabel htmlFor={`${label}-${lang}`}>{LANGUAGE_LABELS[lang]}</LanguageLabel>
          <AutoResizeTextarea registration={registrations[lang]} className="mt-1" />
          {errors[lang]?.message && <ErrorMessage message={errors[lang].message} />}
        </div>
      ))}
    </>
  )
}
