'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { EntityFormModal } from '@/components/entity-form-modal/EntityFormModal'
import type {
  MultilingualText,
  EntityFieldConfig,
  EntityFormData,
  EntityData,
  AvailableCategory
} from '@/components/entity-form-modal/types/entity.types'
import { EntityCard } from './EntityCard'

type Entity = EntityData & { names: MultilingualText }

type ModalState = { type: 'create' } | { type: 'edit'; entity: Entity } | null

type Props = {
  title: string
  label: string
  description: string
  fieldConfig: EntityFieldConfig
  entities: Entity[]
  availableCategories?: AvailableCategory[]
  onCreate?: (data: EntityFormData) => Promise<void>
  onUpdate?: (id: string, data: EntityFormData) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}

export function EntitiesPage({
  title,
  label,
  description,
  fieldConfig,
  entities,
  availableCategories,
  onCreate,
  onUpdate,
  onDelete
}: Props) {
  const t = useTranslations('entityForm')
  const [modal, setModal] = useState<ModalState>(null)

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={() => setModal({ type: 'create' })}
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
            onClick={() => setModal({ type: 'edit', entity })}
            onDelete={onDelete ? () => onDelete(entity.id) : undefined}
          />
        ))}
      </ul>
      {modal && (
        <EntityFormModal
          label={label}
          fieldConfig={fieldConfig}
          entity={modal.type === 'edit' ? modal.entity : undefined}
          availableCategories={availableCategories}
          onClose={() => setModal(null)}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={
            modal.type === 'edit' && onDelete
              ? () => {
                  onDelete(modal.entity.id)
                  setModal(null)
                }
              : undefined
          }
        />
      )}
    </main>
  )
}
