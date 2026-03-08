'use client'

import {
  useFieldArray,
  type Control,
  type UseFormRegister
} from 'react-hook-form'
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  type Language
} from '@/lib/languages'
import { DeleteButton } from '@/components/common/DeleteButton'

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

const inputClass =
  'w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'

const emptyEntry = (): DetailsEntry => ({
  key: Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, ''])
  ) as Record<Language, string>,
  value: Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, ''])
  ) as Record<Language, string>
})

export function DetailsFields({ control, register, fieldName, errors }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: fieldName })

  const fieldErrors: RowErrors[] = errors?.[fieldName] ?? []

  return (
    <div>
      <div className="flex items-center justify-between pt-3">
        <p className="text-base font-medium text-gray-700">Details</p>
        <button
          type="button"
          onClick={() => append(emptyEntry())}
          className="text-xs text-gray-500 underline hover:text-gray-700"
        >
          + Add entry
        </button>
      </div>
      {fields.length > 0 && (
        <div className="mt-3 space-y-1">
          {SUPPORTED_LANGUAGES.map((lang, langIndex) => (
            <div key={lang} className={langIndex > 0 ? 'pt-2' : undefined}>
              <p className="text-xs font-medium text-gray-500 mb-1">
                {LANGUAGE_LABELS[lang]}
              </p>
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
                        <div className="w-4 shrink-0" />
                      )}
                      <div className="w-28 shrink-0">
                        <input
                          {...register(`${fieldName}.${index}.key.${lang}`)}
                          placeholder="label"
                          className={inputClass}
                        />
                        {rowErrors?.key?.[lang]?.message && (
                          <p className="text-xs text-red-500">
                            {rowErrors.key[lang]!.message}
                          </p>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          {...register(`${fieldName}.${index}.value.${lang}`)}
                          placeholder="value"
                          className={inputClass}
                        />
                        {rowErrors?.value?.[lang]?.message && (
                          <p className="text-xs text-red-500">
                            {rowErrors.value[lang]!.message}
                          </p>
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
