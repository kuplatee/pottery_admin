'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import {
  CreateCategoryDocument,
  GetAllCategoriesDocument,
  type CreateCategoryMutation,
  type GetAllCategoriesQuery
} from '@/services/graphql-client/graphql-queries/queries.generated'
import type { CreateCategoryInput } from '@/types/graphql-schema-types.generated'

export function useCreateCategory() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  async function createCategory(input: CreateCategoryInput): Promise<void> {
    await client.mutate<CreateCategoryMutation>({
      mutation: CreateCategoryDocument,
      variables: { input }
    })

    const result = await client.query<GetAllCategoriesQuery>({
      query: GetAllCategoriesDocument,
      fetchPolicy: 'network-only'
    })

    if (result.data) {
      dispatch({ type: 'SET_CATEGORIES', payload: result.data.categories })
    }
  }

  return { createCategory }
}
