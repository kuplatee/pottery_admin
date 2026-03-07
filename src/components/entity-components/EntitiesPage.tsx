'use client'

import { useState } from 'react'
import { EntityCard } from '@/components/entity-components/EntityCard'
import { EntityModal, type EntityFieldConfig, type EntityFormData } from '@/components/form-modal/CreateEntityModal'

type Entity = {
  id: string
  names: { en: string; fi: string }
  description?: { en: string; fi: string }
  details?: { en: Record<string, string>; fi: Record<string, string> }
}

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; entity: Entity }
  | null

type Props = {
  title: string
  label: string
  description: string
  fieldConfig: EntityFieldConfig
  entities: Entity[]
  onCreate?: (data: EntityFormData) => Promise<void>
  onUpdate?: (id: string, data: EntityFormData) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}

export function EntitiesPage({ title, label, description, fieldConfig, entities, onCreate, onUpdate, onDelete }: Props) {
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
          + New {label}
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
        <EntityModal
          label={label}
          fieldConfig={fieldConfig}
          entity={modal.type === 'edit' ? modal.entity : undefined}
          onClose={() => setModal(null)}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={modal.type === 'edit' && onDelete ? () => { onDelete(modal.entity.id); setModal(null) } : undefined}
        />
      )}
    </main>
  )
}
