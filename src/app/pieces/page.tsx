'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client/react'
import { usePieceActions } from '@/services/graphql-client/hooks/usePieceActions'
import { PiecesView } from '@/components/views/PiecesView'
import type { EntityFieldConfig, EntityFormData } from '@/components/entity-form-modal/types/entity.types'
import {
  GetAllPiecesDocument,
  GetAllPiecesQuery
} from '@/services/graphql-client/graphql-queries/pieces.generated'
import {
  GetAllDesignsDocument,
  GetAllDesignsQuery
} from '@/services/graphql-client/graphql-queries/designs.generated'
import {
  GetAllCollectionsDocument,
  GetAllCollectionsQuery
} from '@/services/graphql-client/graphql-queries/collections.generated'

const PIECE_FIELD_CONFIG: EntityFieldConfig = {
  designId: true,
  sold: true,
  collectionId: true,
  imageFileNames: true
}

export default function PiecesPage() {
  const t = useTranslations('pages.pieces')
  const router = useRouter()
  const { data: piecesData } = useQuery<GetAllPiecesQuery>(GetAllPiecesDocument)
  const { data: designsData } = useQuery<GetAllDesignsQuery>(GetAllDesignsDocument)
  const { data: collectionsData } = useQuery<GetAllCollectionsQuery>(GetAllCollectionsDocument)
  const { create, update, remove } = usePieceActions()

  const pieces = piecesData?.pieces ?? []
  const designs = designsData?.designs ?? []
  const collections = collectionsData?.collections ?? []

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
      pieces={pieces}
      designs={designs}
      collections={collections}
      onPieceClick={(id) => router.push(`/pieces/${id}`)}
      onCreate={handleCreatePiece}
      onUpdate={handleUpdatePiece}
      onDelete={remove}
    />
  )
}
