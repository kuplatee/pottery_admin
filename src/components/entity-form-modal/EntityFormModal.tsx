'use client'

import { useTranslations } from 'next-intl'
import { MultilingualFieldsInput } from './inputs/MultilingualFieldsInput'
import { DetailsFieldsInput } from './inputs/DetailsFieldsInput'
import { CategoryPickedInput } from './inputs/CategoriesPickedInput'
import { ModalActions } from './layout/ModalActions'
import { DbIdInfo } from './layout/DbIdInfo'
import { ModalHeader } from './layout/ModalHeader'
import type {
  EntityFieldConfig,
  EntityFormData,
  EntityData,
  AvailableCategory
} from './types/entity.types'
import { useEntityForm } from './utils/useEntityForm'

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

export function EntityFormModal({
  label,
  fieldConfig,
  entity,
  availableCategories,
  onClose,
  onCreate,
  onUpdate,
  onDelete
}: Props) {
  const t = useTranslations('entityForm')

  const {
    isEditing,
    id,
    register,
    control,
    errors,
    handleSubmit,
    multilingualRegistrations,
    multilingualErrors
  } = useEntityForm({ fieldConfig, entity, onClose, onCreate, onUpdate })

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
            title={isEditing ? t('editTitle', { label }) : t('newTitle', { label })}
            onClose={onClose}
          />
          <DbIdInfo id={id} />
          <form onSubmit={handleSubmit} className="space-y-3">
            {fieldConfig.names && (
              <MultilingualFieldsInput
                label={t('names')}
                registrations={multilingualRegistrations('names')}
                errors={multilingualErrors('names')}
              />
            )}
            {fieldConfig.description && (
              <MultilingualFieldsInput
                label={t('description')}
                registrations={multilingualRegistrations('description')}
                errors={multilingualErrors('description')}
              />
            )}
            {fieldConfig.details && (
              <DetailsFieldsInput
                control={control}
                register={register}
                fieldName="details"
                errors={errors}
              />
            )}
            {fieldConfig.categoryIds && (
              <CategoryPickedInput
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
