'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { usePieceActions } from '@/services/graphql-client/hooks/usePieceActions'
import { PiecesView } from '@/components/views/PiecesView'
import type { EntityFieldConfig, EntityFormData } from '@/components/entity-form-modal/types/entity.types'

const PIECE_FIELD_CONFIG: EntityFieldConfig = {
  designId: true,
  sold: true,
  collectionId: true,
  imageFileNames: true
}

export default function PiecesPage() {
  const t = useTranslations('pages.pieces')
  const router = useRouter()
  const { state } = useAppState()
  const { create, update, remove } = usePieceActions()

  async function handleCreatePiece(data: EntityFormData): Promise<void> {
    await create({
      designId: data.designId!,
      sold: data.sold ?? false,
      imageFileNames: data.imageFileNames ?? [],
      collectionId: data.collectionId ?? undefined
    })
  }

  async function handleUpdatePiece(id: string, data: EntityFormData): Promise<void> {
    await update({
      id,
      designId: data.designId!,
      sold: data.sold ?? false,
      imageFileNames: data.imageFileNames ?? [],
      collectionId: data.collectionId ?? undefined
    })
  }

  return (
    <PiecesView
      title={t('title')}
      description={t('description')}
      label={t('label')}
      fieldConfig={PIECE_FIELD_CONFIG}
      pieces={state.pieces}
      designs={state.designs}
      collections={state.collections}
      onPieceClick={(id) => router.push(`/pieces/${id}`)}
      onCreate={handleCreatePiece}
      onUpdate={handleUpdatePiece}
      onDelete={remove}
    />
  )
}
