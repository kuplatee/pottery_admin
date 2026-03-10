'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

import { EntityFormModal } from '@/components/entity-form-modal/EntityFormModal'
import type {
  MultilingualText,
  EntityFieldConfig,
  EntityFormData,
  EntityData,
  AvailableGroup
} from '@/components/entity-form-modal/types/entity.types'
import { EntityCard } from './EntityCard'
import { PieceCard } from './PieceCard'

type Entity = EntityData & { names: MultilingualText }
type ModalState =
  | { type: 'create' }
  | { type: 'edit'; entity: Entity }
  | { type: 'edit-piece'; piece: Piece }
  | null

type LocalizedNames = { en: string; fi: string }
type Piece = { id: string; designId: string; sold: boolean; collectionId?: string | null; imageFileNames: string[] }
type Design = { id: string; names: LocalizedNames }
type Collection = { id: string; names: LocalizedNames }

type Props = {
  title: string
  description: string
  // Named entity CRUD mode
  label?: string
  fieldConfig?: EntityFieldConfig
  entities?: Entity[]
  availableCategories?: AvailableGroup[]
  onCreate?: (data: EntityFormData) => Promise<void>
  onUpdate?: (id: string, data: EntityFormData) => Promise<void>
  onDelete?: (id: string) => Promise<void>
  // Piece mode
  pieces?: Piece[]
  designs?: Design[]
  collections?: Collection[]
}

export function EntitiesView({
  title,
  description,
  label,
  fieldConfig,
  entities,
  availableCategories,
  onCreate,
  onUpdate,
  onDelete,
  pieces,
  designs,
  collections
}: Props) {
  const t = useTranslations('entityForm')
  const locale = useLocale() as 'en' | 'fi'
  const [modal, setModal] = useState<ModalState>(null)

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        {label && onCreate && (
          <button
            onClick={() => setModal({ type: 'create' })}
            className="rounded-lg border border-gray-500 bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
          >
            {t('newButton', { label })}
          </button>
        )}
      </div>

      {pieces ? (
        <ul className="mt-6 flex flex-wrap gap-4">
          {pieces.map((piece) => {
            const design = designs?.find((d) => d.id === piece.designId)
            const collection = piece.collectionId
              ? collections?.find((c) => c.id === piece.collectionId)
              : undefined

            return (
              <PieceCard
                key={piece.id}
                piece={piece}
                designName={design?.names[locale] ?? piece.designId}
                collectionName={collection?.names[locale]}
                onClick={() => setModal({ type: 'edit-piece', piece })}
                onDelete={onDelete ? () => onDelete(piece.id) : undefined}
              />
            )
          })}
        </ul>
      ) : (
        <ul className="mt-6 space-y-2">
          {entities?.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
              onClick={() => setModal({ type: 'edit', entity })}
              onDelete={onDelete ? () => onDelete(entity.id) : undefined}
            />
          ))}
        </ul>
      )}

      {modal && label && fieldConfig && (
        <EntityFormModal
          label={label}
          fieldConfig={fieldConfig}
          entity={
            modal.type === 'edit'
              ? modal.entity
              : modal.type === 'edit-piece'
                ? {
                    ...modal.piece,
                    collectionId: modal.piece.collectionId ?? undefined
                  }
                : undefined
          }
          availableCategories={availableCategories}
          availableCollections={collections}
          availableDesigns={designs}
          onClose={() => setModal(null)}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={
            (modal.type === 'edit' || modal.type === 'edit-piece') && onDelete
              ? () => {
                  const id =
                    modal.type === 'edit' ? modal.entity.id : modal.piece.id
                  onDelete(id)
                  setModal(null)
                }
              : undefined
          }
        />
      )}
    </main>
  )
}
