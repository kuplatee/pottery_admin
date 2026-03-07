'use client'

import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form'

export type DetailsEntry = {
  keyFi: string
  valueFi: string
  keyEn: string
  valueEn: string
}

type RowErrors = {
  keyFi?: { message?: string }
  valueFi?: { message?: string }
  keyEn?: { message?: string }
  valueEn?: { message?: string }
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

const inputClass = 'w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'

export function DetailsFields({ control, register, fieldName, errors }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: fieldName })

  const fieldErrors: RowErrors[] = errors?.[fieldName] ?? []

  return (
    <div>
      <div className="flex items-center justify-between pt-3">
        <p className="text-base font-medium text-gray-700">Details</p>
        <button
          type="button"
          onClick={() => append({ keyFi: '', valueFi: '', keyEn: '', valueEn: '' })}
          className="text-xs text-gray-500 underline hover:text-gray-700"
        >
          + Add entry
        </button>
      </div>
      {fields.length > 0 && (
        <div className="mt-3 space-y-1">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Finnish</p>
            <div className="space-y-2 ">
              {fields.map((field, index) => {
                const rowErrors = fieldErrors[index]
                return (
                  <div key={`fi-${field.id}`} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-300 hover:text-red-400 shrink-0"
                      aria-label="Remove entry"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 3.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="w-28 shrink-0">
                      <input {...register(`${fieldName}.${index}.keyFi`)} placeholder="label" className={inputClass} />
                      {rowErrors?.keyFi?.message && <p className="text-xs text-red-500">{rowErrors.keyFi.message}</p>}
                    </div>
                    <div className="flex-1">
                      <input {...register(`${fieldName}.${index}.valueFi`)} placeholder="value" className={inputClass} />
                      {rowErrors?.valueFi?.message && <p className="text-xs text-red-500">{rowErrors.valueFi.message}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-500 mb-1">English</p>
            <div className="space-y-2 ">
              {fields.map((field, index) => {
                const rowErrors = fieldErrors[index]
                return (
                  <div key={`en-${field.id}`} className="flex items-center gap-2">
                    <div className="w-4 shrink-0" />
                    <div className="w-28 shrink-0">
                      <input {...register(`${fieldName}.${index}.keyEn`)} placeholder="label" className={inputClass} />
                      {rowErrors?.keyEn?.message && <p className="text-xs text-red-500">{rowErrors.keyEn.message}</p>}
                    </div>
                    <div className="flex-1">
                      <input {...register(`${fieldName}.${index}.valueEn`)} placeholder="value" className={inputClass} />
                      {rowErrors?.valueEn?.message && <p className="text-xs text-red-500">{rowErrors.valueEn.message}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
