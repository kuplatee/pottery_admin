'use client'

import { useEffect } from 'react'
import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import {
  GetAllCategoriesDocument,
  type GetAllCategoriesQuery
} from '@/services/graphql-client/graphql-queries/queries.generated'

export function DataLoader() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  useEffect(() => {
    async function loadData() {
      const result = await client.query<GetAllCategoriesQuery>({
        query: GetAllCategoriesDocument
      })

      if (!result.data) {
        return
      }

      dispatch({ type: 'SET_CATEGORIES', payload: result.data.categories })
    }

    loadData()
  }, [client, dispatch])

  return null
}
