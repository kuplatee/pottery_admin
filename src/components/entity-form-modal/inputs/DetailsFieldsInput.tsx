'use client'

import {
  useFieldArray,
  type Control,
  type UseFormRegister
} from 'react-hook-form'
import { useTranslations } from 'next-intl'
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  type Language
} from '@/lib/languages'
import { DeleteButton } from '@/components/common-primitives/DeleteIconButton'
import { ErrorMessage } from '@/components/common-primitives/ErrorMessage'
import { AutoResizeTextarea } from '@/components/common-primitives/AutoResizeTextarea'
import { LanguageLabel } from '@/components/common-primitives/LanguageLabel'
import { SectionTitle } from '@/components/common-primitives/SectionTitle'

export type DetailsEntry = {
  key: Record<Language, string>
  value: Record<Language, string>
}

type RowErrors = {
  key?: Partial<Record<Language, { message?: string }>>
  value?: Partial<Record<Language, { message?: string }>>
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  fieldName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
}

const emptyEntry = (): DetailsEntry => ({
  key: Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, ''])
  ) as Record<Language, string>,
  value: Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, ''])
  ) as Record<Language, string>
})

export function DetailsFieldsInput({
  control,
  register,
  fieldName,
  errors
}: Props) {
  const t = useTranslations('entityForm')
  const { fields, append, remove } = useFieldArray({ control, name: fieldName })

  const fieldErrors: RowErrors[] = errors?.[fieldName] ?? []

  return (
    <div>
      <div className="flex items-center justify-between">
        <SectionTitle>{t('details')}</SectionTitle>
        <button
          type="button"
          onClick={() => append(emptyEntry())}
          className="text-xs text-gray-500 underline hover:text-gray-700"
        >
          {t('addEntry')}
        </button>
      </div>
      {fields.length > 0 && (
        <div className="mt-3 space-y-1">
          {SUPPORTED_LANGUAGES.map((lang, langIndex) => (
            <div key={lang} className={langIndex > 0 ? 'pt-2' : undefined}>
              <LanguageLabel>{LANGUAGE_LABELS[lang]}</LanguageLabel>
              <div className="space-y-2">
                {fields.map((field, index) => {
                  const rowErrors = fieldErrors[index]
                  return (
                    <div
                      key={`${lang}-${field.id}`}
                      className="flex items-center gap-2"
                    >
                      {langIndex === 0 ? (
                        <DeleteButton onClick={() => remove(index)} />
                      ) : (
                        <div className="w-6 shrink-0" />
                      )}
                      <div className="w-28 shrink-0">
                        <AutoResizeTextarea
                          registration={register(
                            `${fieldName}.${index}.key.${lang}`
                          )}
                          placeholder={t('keyPlaceholder')}
                        />
                        {rowErrors?.key?.[lang]?.message && (
                          <ErrorMessage
                            message={rowErrors.key[lang]!.message!}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <AutoResizeTextarea
                          registration={register(
                            `${fieldName}.${index}.value.${lang}`
                          )}
                          placeholder={t('valuePlaceholder')}
                        />
                        {rowErrors?.value?.[lang]?.message && (
                          <ErrorMessage
                            message={rowErrors.value[lang]!.message!}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
