'use client'

import { useTranslations } from 'next-intl'

import { EntityFormModal } from '@/components/entity-form-modal/EntityFormModal'
import type {
  MultilingualText,
  EntityFieldConfig,
  EntityFormData,
  EntityData,
  AvailableGroup
} from '@/components/entity-form-modal/types/entity.types'
import { useModalState } from '@/components/entity-form-modal/utils/useModalState'
import { EntityCard } from './EntityCard'

type Entity = EntityData & { names: MultilingualText }

type Props = {
  title: string
  description: string
  label: string
  fieldConfig: EntityFieldConfig
  entities: Entity[]
  entityPieceCounts?: Record<string, number>
  availableCategories?: AvailableGroup[]
  onEntityClick?: (id: string) => void
  onCreate: (data: EntityFormData) => Promise<void>
  onUpdate: (id: string, data: EntityFormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function EntitiesView({
  title,
  description,
  label,
  fieldConfig,
  entities,
  entityPieceCounts,
  availableCategories,
  onEntityClick,
  onCreate,
  onUpdate,
  onDelete
}: Props) {
  const t = useTranslations('entityForm')
  const { modal, openCreate, openEdit, close } = useModalState<Entity>()

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg border border-gray-500 bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
        >
          {t('newButton', { label })}
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {entities.map((entity) => (
          <EntityCard
            key={entity.id}
            entity={entity}
            onClick={onEntityClick ? () => onEntityClick(entity.id) : undefined}
            onEdit={() => openEdit(entity)}
            onDelete={() => onDelete(entity.id)}
            pieceCount={entityPieceCounts?.[entity.id]}
          />
        ))}
      </ul>

      {modal && (
        <EntityFormModal
          label={label}
          fieldConfig={fieldConfig}
          entity={modal.type === 'edit' ? modal.entity : undefined}
          availableCategories={availableCategories}
          onClose={close}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={
            modal.type === 'edit'
              ? () => {
                  onDelete(modal.entity.id)
                  close()
                }
              : undefined
          }
        />
      )}
    </main>
  )
}
