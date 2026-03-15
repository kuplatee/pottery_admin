'use client'

import { use } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client/react'
import { GoBackButton } from '@/components/common-primitives/GoBackButton'
import { SinglePieceView } from '@/components/views/SinglePieceView'
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
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery
} from '@/services/graphql-client/graphql-queries/categories.generated'

type Props = {
  params: Promise<{ id: string }>
}

export default function PiecePage({ params }: Props) {
  const { id } = use(params)
  const t = useTranslations('pages.pieces')
  const { data: piecesData } = useQuery<GetAllPiecesQuery>(GetAllPiecesDocument)
  const { data: designsData } = useQuery<GetAllDesignsQuery>(GetAllDesignsDocument)
  const { data: collectionsData } = useQuery<GetAllCollectionsQuery>(GetAllCollectionsDocument)
  const { data: categoriesData } = useQuery<GetAllCategoriesQuery>(GetAllCategoriesDocument)

  const piece = piecesData?.pieces.find((p) => p.id === id)

  if (piecesData && !piece) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">{t('notFound')}</p>
        <GoBackButton />
      </main>
    )
  }

  if (!piece) {
    return null
  }

  const design = designsData?.designs.find((d) => d.id === piece.designId)
  const collection = piece.collectionId
    ? collectionsData?.collections.find((c) => c.id === piece.collectionId)
    : undefined
  const categories = (categoriesData?.categories ?? []).filter((c) =>
    design?.categoryIds.includes(c.id)
  )

  return (
    <SinglePieceView
      entity={piece}
      design={design}
      collection={collection}
      categories={categories}
    />
  )
}
