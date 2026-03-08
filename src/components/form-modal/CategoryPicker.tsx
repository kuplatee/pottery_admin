'use client'

import { Controller, type Control } from 'react-hook-form'
import { AvailableCategory } from './entity.types'
import { ErrorMessage } from '@/components/common-primitives/ErrorMessage'
import { SectionTitle } from '@/components/common-primitives/SectionTitle'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  fieldName: string
  availableCategories: AvailableCategory[]
  error?: { message?: string }
}

export function CategoryPicker({
  control,
  fieldName,
  availableCategories,
  error
}: Props) {
  return (
    <div>
      <SectionTitle>Categories</SectionTitle>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => {
          const selected: string[] = field.value ?? []

          function toggle(id: string) {
            if (selected.includes(id)) {
              field.onChange(selected.filter((s) => s !== id))
            } else {
              field.onChange([...selected, id])
            }
          }

          return (
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => {
                const isSelected = selected.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggle(cat.id)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      isSelected
                        ? 'border-gray-700 bg-gray-700 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {cat.names.en}
                  </button>
                )
              })}
              {availableCategories.length === 0 && (
                <p className="text-sm text-gray-400 italic">
                  No categories available
                </p>
              )}
            </div>
          )
        }}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  )
}
