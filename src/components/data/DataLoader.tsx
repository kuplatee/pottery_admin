'use client'

import { useEffect } from 'react'
import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import {
  GetAllCategoriesDocument,
  type GetAllCategoriesQuery,
  GetAllDesignsDocument,
  type GetAllDesignsQuery
} from '@/services/graphql-client/graphql-queries/queries.generated'

export function DataLoader() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  useEffect(() => {
    async function loadData() {
      const [categoriesResult, designsResult] = await Promise.all([
        client.query<GetAllCategoriesQuery>({ query: GetAllCategoriesDocument }),
        client.query<GetAllDesignsQuery>({ query: GetAllDesignsDocument })
      ])

      if (categoriesResult.data) {
        dispatch({ type: 'SET_CATEGORIES', payload: categoriesResult.data.categories })
      }

      if (designsResult.data) {
        dispatch({ type: 'SET_DESIGNS', payload: designsResult.data.designs })
      }
    }

    loadData()
  }, [client, dispatch])

  return null
}
