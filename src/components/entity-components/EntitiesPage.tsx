'use client'

import { useState } from 'react'
import { EntityCard } from '@/components/entity-components/EntityCard'
import { EntityModal } from '@/components/form-modal/CreateEntityModal'

type NamedEntity = {
  id: string
  names: { en: string; fi: string }
}

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; entity: NamedEntity }
  | null

type Props = {
  title: string
  label: string
  description: string
  entities: NamedEntity[]
  onCreate?: (names: { en: string; fi: string }) => Promise<void>
}

export function EntitiesPage({ title, label, description, entities, onCreate }: Props) {
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
          />
        ))}
      </ul>
      {modal && (
        <EntityModal
          label={label}
          entity={modal.type === 'edit' ? modal.entity : undefined}
          onClose={() => setModal(null)}
          onCreate={onCreate}
        />
      )}
    </main>
  )
}
