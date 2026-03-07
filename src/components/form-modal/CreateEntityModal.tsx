'use client'

import { useForm } from 'react-hook-form'
import { MultilingualFields } from './MultilingualFields'
import { DetailsFields, type DetailsEntry } from './DetailsFields'
import { ModalActions } from './ModalActions'
import { DbId } from './DbId'
import { ModalHeader } from './ModalHeader'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { FieldError } from 'react-hook-form'

export type EntityFieldConfig = {
  names?: boolean
  description?: boolean
  details?: boolean
}

export type EntityFormData = {
  names?: { en: string; fi: string }
  description?: { en: string; fi: string }
  details?: DetailsEntry[]
}

type EntityData = {
  id: string
  names?: { en: string; fi: string }
  description?: { en: string; fi: string }
  details?: { en: Record<string, string>; fi: Record<string, string> }
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
  onClose: () => void
  onCreate?: (data: EntityFormData) => Promise<void>
  onUpdate?: (id: string, data: EntityFormData) => Promise<void>
  onDelete?: () => void
}

export function EntityModal({ label, fieldConfig, entity, onClose, onCreate, onUpdate, onDelete }: Props) {
  const isEditing = entity !== undefined
  const id = entity?.id

  const schema = buildSchema(fieldConfig)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, control, formState: { errors: rawErrors } } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...(fieldConfig.names && { nameFi: entity?.names?.fi ?? '', nameEn: entity?.names?.en ?? '' }),
      ...(fieldConfig.description && { descriptionFi: entity?.description?.fi ?? '', descriptionEn: entity?.description?.en ?? '' }),
      ...(fieldConfig.details && { details: entity?.details ? toDetailsEntries(entity.details) : [] }),
    },
  })

  const errors = rawErrors as Record<string, FieldError | undefined>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(values: any) {
    const data: EntityFormData = {
      ...(fieldConfig.names && { names: { en: values.nameEn, fi: values.nameFi } }),
      ...(fieldConfig.description && { description: { en: values.descriptionEn, fi: values.descriptionFi } }),
      ...(fieldConfig.details && { details: values.details }),
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
                fiError={errors.nameFi}
                enError={errors.nameEn}
              />
            )}
            {fieldConfig.description && (
              <MultilingualFields
                label="Description"
                fiRegistration={register('descriptionFi')}
                enRegistration={register('descriptionEn')}
                fiError={errors.descriptionFi}
                enError={errors.descriptionEn}
              />
            )}
            {fieldConfig.details && (
              <DetailsFields
                control={control}
                register={register}
                fieldName="details"
                errors={rawErrors}
              />
            )}
            <ModalActions isEditing={isEditing} onDelete={onDelete} />
          </form>
        </div>
      </div>
    </>
  )
}
