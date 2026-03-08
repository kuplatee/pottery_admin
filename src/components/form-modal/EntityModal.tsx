'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { FieldError, Resolver } from 'react-hook-form'
import { MultilingualFields } from './MultilingualFields'
import { DetailsFields, type DetailsEntry } from './DetailsFields'
import { CategoryPicker } from './CategoryPicker'
import { ModalActions } from './ModalActions'
import { DbId } from './DbId'
import { ModalHeader } from './ModalHeader'
import type { EntityFieldConfig, EntityFormData, EntityData, AvailableCategory } from './entity.types'

// FormValues covers all possible fields across entity types.
// Fields are optional here because the dynamic schema (built from fieldConfig)
// determines which are actually required at runtime via Zod validation.
type FormValues = {
  nameFi?: string
  nameEn?: string
  descriptionFi?: string
  descriptionEn?: string
  details?: DetailsEntry[]
  categoryIds?: string[]
}

const detailEntrySchema = z.object({
  keyFi: z.string().min(1, 'Required'),
  valueFi: z.string().min(1, 'Required'),
  keyEn: z.string().min(1, 'Required'),
  valueEn: z.string().min(1, 'Required'),
})

function buildSchema(config: EntityFieldConfig) {
  return z.object({
    ...(config.names && { nameFi: z.string().min(1, 'Required'), nameEn: z.string().min(1, 'Required') }),
    ...(config.description && { descriptionFi: z.string().min(1, 'Required'), descriptionEn: z.string().min(1, 'Required') }),
    ...(config.details && { details: z.array(detailEntrySchema) }),
    ...(config.categoryIds && { categoryIds: z.array(z.string()).min(1, 'Select at least one category') }),
  })
}

function toDetailsEntries(details: { en: Record<string, string>; fi: Record<string, string> }): DetailsEntry[] {
  const enEntries = Object.entries(details.en)
  const fiEntries = Object.entries(details.fi)
  return enEntries.map(([keyEn, valueEn], i) => {
    const [keyFi, valueFi] = fiEntries[i] ?? ['', '']
    return { keyFi, valueFi, keyEn, valueEn }
  })
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

export function EntityModal({ label, fieldConfig, entity, availableCategories, onClose, onCreate, onUpdate, onDelete }: Props) {
  const isEditing = entity !== undefined
  const id = entity?.id

  const schema = useMemo(() => buildSchema(fieldConfig), [fieldConfig])

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    // Cast is safe: buildSchema always produces a schema compatible with FormValues.
    // Zod v4 + react-hook-form resolver types can't infer the dynamic spread shape.
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      ...(fieldConfig.names && { nameFi: entity?.names?.fi ?? '', nameEn: entity?.names?.en ?? '' }),
      ...(fieldConfig.description && { descriptionFi: entity?.description?.fi ?? '', descriptionEn: entity?.description?.en ?? '' }),
      ...(fieldConfig.details && { details: entity?.details ? toDetailsEntries(entity.details) : [] }),
      ...(fieldConfig.categoryIds && { categoryIds: entity?.categoryIds ?? [] }),
    },
  })

  async function onSubmit(values: FormValues) {
    // Non-null assertions below are safe: Zod has already validated that these
    // fields are non-empty strings when their corresponding fieldConfig flag is true.
    const data: EntityFormData = {
      ...(fieldConfig.names && { names: { en: values.nameEn!, fi: values.nameFi! } }),
      ...(fieldConfig.description && { description: { en: values.descriptionEn!, fi: values.descriptionFi! } }),
      ...(fieldConfig.details && { details: values.details }),
      ...(fieldConfig.categoryIds && { categoryIds: values.categoryIds }),
    }

    if (isEditing && id && onUpdate) {
      await onUpdate(id, data)
    } else if (onCreate) {
      await onCreate(data)
    }

    onClose()
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
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title={isEditing ? `Edit ${label}` : `New ${label}`} onClose={onClose} />
          <DbId id={id} />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {fieldConfig.names && (
              <MultilingualFields
                label="Names"
                fiRegistration={register('nameFi')}
                enRegistration={register('nameEn')}
                fiError={errors.nameFi as FieldError | undefined}
                enError={errors.nameEn as FieldError | undefined}
              />
            )}
            {fieldConfig.description && (
              <MultilingualFields
                label="Description"
                fiRegistration={register('descriptionFi')}
                enRegistration={register('descriptionEn')}
                fiError={errors.descriptionFi as FieldError | undefined}
                enError={errors.descriptionEn as FieldError | undefined}
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
