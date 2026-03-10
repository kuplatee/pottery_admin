'use client'

import { useEffect } from 'react'
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

  useEffect(() => {
    async function loadData() {
      const [categoriesResult, collectionsResult, designsResult, piecesResult] = await Promise.all([
        client.query<GetAllCategoriesQuery>({ query: GetAllCategoriesDocument }),
        client.query<GetAllCollectionsQuery>({ query: GetAllCollectionsDocument }),
        client.query<GetAllDesignsQuery>({ query: GetAllDesignsDocument }),
        client.query<GetAllPiecesQuery>({ query: GetAllPiecesDocument })
      ])

      if (categoriesResult.data) {
        dispatch({ type: 'SET_CATEGORIES', payload: categoriesResult.data.categories })
      }

      if (collectionsResult.data) {
        dispatch({ type: 'SET_COLLECTIONS', payload: collectionsResult.data.collections })
      }

      if (designsResult.data) {
        dispatch({ type: 'SET_DESIGNS', payload: designsResult.data.designs })
      }

      if (piecesResult.data) {
        dispatch({ type: 'SET_PIECES', payload: piecesResult.data.pieces })
      }
    }

    loadData()
  }, [client, dispatch])

  return null
}
