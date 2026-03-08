import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FieldError, Resolver } from 'react-hook-form'
import { SUPPORTED_LANGUAGES, type Language } from '@/lib/languages'
import { buildSchema } from './buildSchemaUtils'
import {
  EntityFieldConfig,
  EntityData,
  EntityFormData,
  FormValues
} from '../types/entity.types'
import { buildDefaultValues } from './buildDefaultValues'

type Props = {
  fieldConfig: EntityFieldConfig
  entity?: EntityData
  onClose: () => void
  onCreate?: (data: EntityFormData) => Promise<void>
  onUpdate?: (id: string, data: EntityFormData) => Promise<void>
}

export function useEntityForm({
  fieldConfig,
  entity,
  onClose,
  onCreate,
  onUpdate
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
    defaultValues: buildDefaultValues(fieldConfig, entity)
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
      SUPPORTED_LANGUAGES.map((lang) => [
        lang,
        register(`${field}.${lang}` as const)
      ])
    ) as Record<Language, ReturnType<typeof register>>
  }

  function multilingualErrors(field: 'names' | 'description') {
    const fieldErrors = errors[field] as
      | Partial<Record<Language, FieldError>>
      | undefined
    return fieldErrors ?? {}
  }

  return {
    isEditing,
    id,
    register,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    multilingualRegistrations,
    multilingualErrors
  }
}
