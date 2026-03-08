'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { FieldError, Resolver } from 'react-hook-form'
import { SUPPORTED_LANGUAGES, type Language } from '@/lib/languages'
import { MultilingualFields } from './MultilingualFields'
import { DetailsFields, type DetailsEntry } from './DetailsFields'
import { CategoryPicker } from './CategoryPicker'
import { ModalActions } from './ModalActions'
import { DbId } from './DbId'
import { ModalHeader } from './ModalHeader'
import type {
  EntityFieldConfig,
  EntityFormData,
  EntityData,
  AvailableCategory
} from './entity.types'

// FormValues covers all possible fields across entity types.
// Fields are optional here because the dynamic schema (built from fieldConfig)
// determines which are actually required at runtime via Zod validation.
type FormValues = {
  names?: Record<Language, string>
  description?: Record<Language, string>
  details?: DetailsEntry[]
  categoryIds?: string[]
}

function buildMultilingualSchema() {
  return z.object(
    Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, z.string().min(1, 'Required')])
    ) as Record<Language, z.ZodString>
  )
}

const detailEntrySchema = z.object({
  key: buildMultilingualSchema(),
  value: buildMultilingualSchema()
})

function buildSchema(config: EntityFieldConfig) {
  const multilingualText = buildMultilingualSchema()

  return z.object({
    ...(config.names && { names: multilingualText }),
    ...(config.description && { description: multilingualText }),
    ...(config.details && { details: z.array(detailEntrySchema) }),
    ...(config.categoryIds && {
      categoryIds: z.array(z.string()).min(1, 'Select at least one category')
    })
  })
}

function buildMultilingualDefault(source?: Record<Language, string>): Record<Language, string> {
  return Object.fromEntries(
    SUPPORTED_LANGUAGES.map(lang => [lang, source?.[lang] ?? ''])
  ) as Record<Language, string>
}

function toDetailsEntries(details: Record<Language, Record<string, string>>): DetailsEntry[] {
  const firstLang = SUPPORTED_LANGUAGES[0]
  return Object.keys(details[firstLang]).map((_, i) => ({
    key: Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, Object.keys(details[lang])[i] ?? ''])
    ) as Record<Language, string>,
    value: Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, Object.values(details[lang])[i] ?? ''])
    ) as Record<Language, string>
  }))
}

type Props = {
  label: string
  fieldConfig: EntityFieldConfig
  entity?: EntityData
  availableCategories?: AvailableCategory[]
  onClose: () => void
  onCreate?: (data: EntityFormData) => Promise<void>
  onUpdate?: (id: string, data: EntityFormData) => Promise<void>
  onDelete?: () => void
}

export function EntityModal({
  label,
  fieldConfig,
  entity,
  availableCategories,
  onClose,
  onCreate,
  onUpdate,
  onDelete
}: Props) {
  const isEditing = entity !== undefined
  const id = entity?.id

  const schema = useMemo(() => buildSchema(fieldConfig), [fieldConfig])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    // Cast is safe: buildSchema always produces a schema compatible with FormValues.
    // Zod v4 + react-hook-form resolver types can't infer the dynamic spread shape.
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      ...(fieldConfig.names && { names: buildMultilingualDefault(entity?.names) }),
      ...(fieldConfig.description && { description: buildMultilingualDefault(entity?.description) }),
      ...(fieldConfig.details && {
        details: entity?.details ? toDetailsEntries(entity.details) : []
      }),
      ...(fieldConfig.categoryIds && { categoryIds: entity?.categoryIds ?? [] })
    }
  })

  async function onSubmit(values: FormValues) {
    const data: EntityFormData = {
      ...(fieldConfig.names && { names: values.names }),
      ...(fieldConfig.description && { description: values.description }),
      ...(fieldConfig.details && { details: values.details }),
      ...(fieldConfig.categoryIds && { categoryIds: values.categoryIds })
    }

    if (isEditing && id && onUpdate) {
      await onUpdate(id, data)
    } else if (onCreate) {
      await onCreate(data)
    }

    onClose()
  }

  function multilingualRegistrations(field: 'names' | 'description') {
    return Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, register(`${field}.${lang}` as const)])
    ) as Record<Language, ReturnType<typeof register>>
  }

  function multilingualErrors(field: 'names' | 'description') {
    const fieldErrors = errors[field] as Partial<Record<Language, FieldError>> | undefined
    return fieldErrors ?? {}
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="entity-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader
            title={isEditing ? `Edit ${label}` : `New ${label}`}
            onClose={onClose}
          />
          <DbId id={id} />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {fieldConfig.names && (
              <MultilingualFields
                label="Names"
                registrations={multilingualRegistrations('names')}
                errors={multilingualErrors('names')}
              />
            )}
            {fieldConfig.description && (
              <MultilingualFields
                label="Description"
                registrations={multilingualRegistrations('description')}
                errors={multilingualErrors('description')}
              />
            )}
            {fieldConfig.details && (
              <DetailsFields
                control={control}
                register={register}
                fieldName="details"
                errors={errors}
              />
            )}
            {fieldConfig.categoryIds && (
              <CategoryPicker
                control={control}
                fieldName="categoryIds"
                availableCategories={availableCategories ?? []}
                error={errors.categoryIds as { message?: string } | undefined}
              />
            )}
            <ModalActions isEditing={isEditing} onDelete={onDelete} />
          </form>
        </div>
      </div>
    </>
  )
}
