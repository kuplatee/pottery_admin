'use client'

import { useTranslations } from 'next-intl'
import { MultilingualFieldsInput } from './inputs/MultilingualFieldsInput'
import { DetailsFieldsInput } from './inputs/DetailsFieldsInput'
import { GroupPickerInput } from './inputs/GroupPickerInput'
import { BooleanFieldInput } from './inputs/BooleanFieldInput'
import { ImageDropZone } from './inputs/ImageDropZone'
import { ModalActions } from './layout/ModalActions'
import { DbIdInfo } from './layout/DbIdInfo'
import { ModalHeader } from './layout/ModalHeader'
import type {
  EntityFieldConfig,
  EntityFormData,
  EntityData,
  AvailableGroup
} from './types/entity.types'
import { useEntityForm } from './utils/useEntityForm'
import { useImageUpload } from './utils/useImageUpload'

type Props = {
  label: string
  fieldConfig: EntityFieldConfig
  entity?: EntityData
  availableCategories?: AvailableGroup[]
  availableCollections?: AvailableGroup[]
  availableDesigns?: AvailableGroup[]
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
  availableCollections,
  availableDesigns,
  onClose,
  onCreate,
  onUpdate,
  onDelete
}: Props) {
  const t = useTranslations('entityForm')

  const imageUpload = useImageUpload()

  const {
    isEditing,
    id,
    register,
    control,
    errors,
    handleSubmit,
    multilingualRegistrations,
    multilingualErrors
  } = useEntityForm({
    fieldConfig,
    entity,
    onClose,
    onCreate,
    onUpdate,
    onBeforeSubmit: fieldConfig.imageFileNames ? imageUpload.uploadPending : undefined
  })

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
            title={
              isEditing ? t('editTitle', { label }) : t('newTitle', { label })
            }
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
            {fieldConfig.sold && (
              <BooleanFieldInput
                label={t('sold')}
                registration={register('sold')}
                error={errors.sold}
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
              <GroupPickerInput
                control={control}
                fieldName="categoryIds"
                label={t('categories')}
                availableGroups={availableCategories ?? []}
                emptyLabel={t('noCategoriesAvailable')}
                error={errors.categoryIds as { message?: string } | undefined}
              />
            )}
            {fieldConfig.designId && (
              <GroupPickerInput
                control={control}
                fieldName="designId"
                label={t('design')}
                availableGroups={availableDesigns ?? []}
                multiSelect={false}
                emptyLabel={t('noDesignsAvailable')}
                error={errors.designId as { message?: string } | undefined}
              />
            )}
            {fieldConfig.collectionId && (
              <GroupPickerInput
                control={control}
                fieldName="collectionId"
                label={t('collections')}
                availableGroups={availableCollections ?? []}
                multiSelect={false}
                emptyLabel={t('noCollectionsAvailable')}
                error={errors.collectionId as { message?: string } | undefined}
              />
            )}
            {fieldConfig.imageFileNames && (
              <ImageDropZone
                control={control}
                pendingFiles={imageUpload.pendingFiles}
                uploadState={imageUpload.uploadState}
                onFilesAdded={imageUpload.addFiles}
                onPendingFileRemoved={imageUpload.removePendingFile}
              />
            )}

            <ModalActions isEditing={isEditing} onDelete={onDelete} />
          </form>
        </div>
      </div>
    </>
  )
}
