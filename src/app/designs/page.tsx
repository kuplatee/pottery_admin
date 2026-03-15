'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client/react'
import { useDesignActions } from '@/services/graphql-client/hooks/useDesignActions'
import { toLocalizedJson } from './designFormUtils'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'
import type { LocalizedString } from '@/app/api/graphql/graphql-server/services/common/types'
import {
  GetAllDesignsDocument,
  GetAllDesignsQuery
} from '@/services/graphql-client/graphql-queries/designs.generated'
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery
} from '@/services/graphql-client/graphql-queries/categories.generated'
import {
  GetAllPiecesDocument,
  GetAllPiecesQuery
} from '@/services/graphql-client/graphql-queries/pieces.generated'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function DesignsPage() {
  const t = useTranslations('pages.designs')
  const router = useRouter()
  const { data: designsData } = useQuery<GetAllDesignsQuery>(GetAllDesignsDocument)
  const { data: categoriesData } = useQuery<GetAllCategoriesQuery>(GetAllCategoriesDocument)
  const { data: piecesData } = useQuery<GetAllPiecesQuery>(GetAllPiecesDocument)
  const { create, update, remove } = useDesignActions()

  const designs = designsData?.designs ?? []
  const categories = categoriesData?.categories ?? []
  const pieces = piecesData?.pieces ?? []

  const pieceCountsByDesignId = pieces.reduce<Record<string, number>>((acc, piece) => {
    acc[piece.designId] = (acc[piece.designId] ?? 0) + 1
    return acc
  }, {})

  return (
    <EntitiesView
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{
        names: true,
        description: true,
        details: true,
        categoryIds: true
      }}
      entities={designs}
      entityPieceCounts={pieceCountsByDesignId}
      onEntityClick={(id) => router.push(`/designs/${id}`)}
      availableCategories={categories}
      onCreate={(data) =>
        create({
          names: data.names!,
          categoryIds: data.categoryIds ?? [],
          description: data.description ?? (Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, ''])) as LocalizedString),
          details: toLocalizedJson(data.details)
        })
      }
      onUpdate={(id, data) =>
        update({
          id,
          names: data.names!,
          categoryIds: data.categoryIds ?? [],
          description: data.description ?? (Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, ''])) as LocalizedString),
          details: toLocalizedJson(data.details)
        })
      }
      onDelete={(id) => remove(id)}
    />
  )
}
