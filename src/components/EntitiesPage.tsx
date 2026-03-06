'use client'

import { useState } from 'react'
import { EntityCard } from '@/components/EntityCard'
import { CreateEntityModal } from '@/components/CreateEntityModal'

type NamedEntity = {
  id: string
  names: { en: string; fi: string }
}

type Props = {
  title: string
  label: string
  description: string
  entities: NamedEntity[]
}

export function EntitiesPage({ title, label, description, entities }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg border border-gray-500 bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
        >
          + New {label}
        </button>
      </div>
      <ul className="mt-6 space-y-2">
        {entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </ul>
      {isModalOpen && (
        <CreateEntityModal
          label={label}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  )
}
