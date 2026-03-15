'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import {
  GetAllCategoriesQuery,
  GetAllCategoriesDocument
} from '@/services/graphql-client/graphql-queries/categories.generated'
import {
  GetAllCollectionsQuery,
  GetAllCollectionsDocument
} from '@/services/graphql-client/graphql-queries/collections.generated'
import {
  GetAllDesignsQuery,
  GetAllDesignsDocument
} from '@/services/graphql-client/graphql-queries/designs.generated'
import {
  GetAllPiecesQuery,
  GetAllPiecesDocument
} from '@/services/graphql-client/graphql-queries/pieces.generated'

export function DataLoader() {
  const client = useApiClient()
  const { dispatch } = useAppState()
  const t = useTranslations('dataLoader')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    async function loadData() {
      const [categoriesResult, collectionsResult, designsResult, piecesResult] =
        await Promise.all([
          client.query<GetAllCategoriesQuery>({
            query: GetAllCategoriesDocument
          }),
          client.query<GetAllCollectionsQuery>({
            query: GetAllCollectionsDocument
          }),
          client.query<GetAllDesignsQuery>({ query: GetAllDesignsDocument }),
          client.query<GetAllPiecesQuery>({ query: GetAllPiecesDocument })
        ])

      if (categoriesResult.data) {
        dispatch({
          type: 'SET_CATEGORIES',
          payload: categoriesResult.data.categories
        })
      }

      if (collectionsResult.data) {
        dispatch({
          type: 'SET_COLLECTIONS',
          payload: collectionsResult.data.collections
        })
      }

      if (designsResult.data) {
        dispatch({ type: 'SET_DESIGNS', payload: designsResult.data.designs })
      }

      if (piecesResult.data) {
        dispatch({ type: 'SET_PIECES', payload: piecesResult.data.pieces })
      }
    }

    loadData().catch(() => setFailed(true))
  }, [client, dispatch])

  if (failed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-lg bg-white p-8 shadow-xl text-center max-w-sm">
          <p className="text-lg font-semibold text-gray-800">
            {t('loadErrorTitle')}
          </p>
          <p className="mt-2 text-sm text-gray-500">{t('loadError')}</p>
        </div>
      </div>
    )
  }

  return null
}
