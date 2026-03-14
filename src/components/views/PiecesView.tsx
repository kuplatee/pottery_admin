'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

import { EntityFormModal } from '@/components/entity-form-modal/EntityFormModal'
import type {
  EntityFieldConfig,
  EntityFormData
} from '@/components/entity-form-modal/types/entity.types'
import { PieceCard } from './PieceCard'

type LocalizedNames = { en: string; fi: string }
type Piece = { id: string; designId: string; sold: boolean; collectionId?: string | null; imageFileNames: string[] }
type Design = { id: string; names: LocalizedNames }
type Collection = { id: string; names: LocalizedNames }

type ModalState = { type: 'create' } | { type: 'edit'; piece: Piece } | null

type Props = {
  title: string
  description: string
  label: string
  fieldConfig: EntityFieldConfig
  pieces: Piece[]
  designs: Design[]
  collections: Collection[]
  onPieceClick?: (id: string) => void
  onCreate: (data: EntityFormData) => Promise<void>
  onUpdate: (id: string, data: EntityFormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function PiecesView({
  title,
  description,
  label,
  fieldConfig,
  pieces,
  designs,
  collections,
  onPieceClick,
  onCreate,
  onUpdate,
  onDelete
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
        <button
          onClick={() => setModal({ type: 'create' })}
          className="rounded-lg border border-gray-500 bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
        >
          {t('newButton', { label })}
        </button>
      </div>

      <ul className="mt-6 flex flex-wrap gap-4">
        {pieces.map((piece) => {
          const design = designs.find((d) => d.id === piece.designId)
          const collection = piece.collectionId
            ? collections.find((c) => c.id === piece.collectionId)
            : undefined

          return (
            <PieceCard
              key={piece.id}
              piece={piece}
              designName={design?.names[locale] ?? piece.designId}
              collectionName={collection?.names[locale]}
              onClick={onPieceClick ? () => onPieceClick(piece.id) : () => setModal({ type: 'edit', piece })}
              onDelete={() => onDelete(piece.id)}
            />
          )
        })}
      </ul>

      {modal && (
        <EntityFormModal
          label={label}
          fieldConfig={fieldConfig}
          entity={
            modal.type === 'edit'
              ? { ...modal.piece, collectionId: modal.piece.collectionId ?? undefined }
              : undefined
          }
          availableCollections={collections}
          availableDesigns={designs}
          onClose={() => setModal(null)}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={
            modal.type === 'edit'
              ? () => {
                  onDelete(modal.piece.id)
                  setModal(null)
                }
              : undefined
          }
        />
      )}
    </main>
  )
}
