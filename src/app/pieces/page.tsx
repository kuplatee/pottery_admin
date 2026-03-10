'use client'

import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { usePieceActions } from '@/services/graphql-client/hooks/usePieceActions'
import { EntitiesView } from '@/components/views/EntitiesView'
import type { EntityFieldConfig, EntityFormData } from '@/components/entity-form-modal/types/entity.types'

const PIECE_FIELD_CONFIG: EntityFieldConfig = {
  designId: true,
  sold: true,
  collectionId: true,
  imageFileNames: true
}

export default function PiecesPage() {
  const t = useTranslations('pages.pieces')
  const { state } = useAppState()
  const { updatePiece, deletePiece } = usePieceActions()

  async function handleUpdatePiece(id: string, data: EntityFormData): Promise<void> {
    await updatePiece({
      id,
      designId: data.designId!,
      sold: data.sold ?? false,
      imageFileNames: data.imageFileNames ?? [],
      collectionId: data.collectionId ?? undefined
    })
  }

  return (
    <EntitiesView
      title={t('title')}
      description={t('description')}
      label={t('label')}
      fieldConfig={PIECE_FIELD_CONFIG}
      pieces={state.pieces}
      designs={state.designs}
      collections={state.collections}
      onUpdate={handleUpdatePiece}
      onDelete={deletePiece}
    />
  )
}
