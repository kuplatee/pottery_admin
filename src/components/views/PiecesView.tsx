'use client'

import { useTranslations, useLocale } from 'next-intl'

import { EntityFormModal } from '@/components/entity-form-modal/EntityFormModal'
import type {
  EntityFieldConfig,
  EntityFormData
} from '@/components/entity-form-modal/types/entity.types'
import { useModalState } from '@/components/entity-form-modal/utils/useModalState'
import { PieceCard } from './PieceCard'
import type { Language } from '@/lib/languages'

type LocalizedNames = Record<Language, string>
type Piece = { id: string; designId: string; sold: boolean; collectionId?: string | null; imageFileNames: string[] }
type Design = { id: string; names: LocalizedNames }
type Collection = { id: string; names: LocalizedNames }

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
  const locale = useLocale() as Language
  const { modal, openCreate, openEdit, close } = useModalState<Piece>()

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
              onClick={onPieceClick ? () => onPieceClick(piece.id) : () => openEdit(piece)}
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
              ? { ...modal.entity, collectionId: modal.entity.collectionId ?? undefined }
              : undefined
          }
          availableCollections={collections}
          availableDesigns={designs}
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
