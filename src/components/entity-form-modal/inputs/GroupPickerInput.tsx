'use client'

import { Controller, type Control } from 'react-hook-form'
import { useLocale } from 'next-intl'
import type { AvailableGroup } from '../types/entity.types'
import type { Language } from '@/lib/languages'
import { ErrorMessage } from '@/components/common-primitives/ErrorMessage'
import { SectionTitle } from '@/components/common-primitives/SectionTitle'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  fieldName: string
  label: string
  availableGroups: AvailableGroup[]
  multiSelect?: boolean
  emptyLabel?: string
  error?: { message?: string }
}

export function GroupPickerInput({
  control,
  fieldName,
  label,
  availableGroups,
  multiSelect = true,
  emptyLabel,
  error
}: Props) {
  const locale = useLocale() as Language

  return (
    <div>
      <SectionTitle>{label}</SectionTitle>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => {
          const selected: string[] = multiSelect
            ? (field.value ?? [])
            : field.value
              ? [field.value]
              : []

          function toggle(id: string) {
            if (multiSelect) {
              const current: string[] = field.value ?? []
              if (current.includes(id)) {
                field.onChange(current.filter((s) => s !== id))
              } else {
                field.onChange([...current, id])
              }
            } else {
              field.onChange(field.value === id ? '' : id)
            }
          }

          return (
            <div className="flex flex-wrap gap-2">
              {availableGroups.map((group) => {
                const isSelected = selected.includes(group.id)
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => toggle(group.id)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      isSelected
                        ? 'border-gray-700 bg-gray-700 text-white'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {group.names[locale]}
                  </button>
                )
              })}
              {availableGroups.length === 0 && emptyLabel && (
                <p className="text-sm text-gray-400 italic">{emptyLabel}</p>
              )}
            </div>
          )
        }}
      />
      {error?.message && <ErrorMessage message={error.message} />}
    </div>
  )
}
