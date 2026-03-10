'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'

import type {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/types/graphql-schema-types.generated'
import {
  CreateCategoryDocument,
  CreateCategoryMutation,
  DeleteCategoryDocument,
  DeleteCategoryMutation,
  UpdateCategoryDocument,
  UpdateCategoryMutation
} from '../graphql-queries/categories.generated'

export function useCategoryActions() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  async function createCategory(input: CreateCategoryInput): Promise<void> {
    const result = await client.mutate<CreateCategoryMutation>({
      mutation: CreateCategoryDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'ADD_CATEGORY', payload: result.data.createCategory })
    }
  }

  async function updateCategory(input: UpdateCategoryInput): Promise<void> {
    const result = await client.mutate<UpdateCategoryMutation>({
      mutation: UpdateCategoryDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'UPDATE_CATEGORY', payload: result.data.updateCategory })
    }
  }

  async function deleteCategory(id: string): Promise<void> {
    await client.mutate<DeleteCategoryMutation>({
      mutation: DeleteCategoryDocument,
      variables: { id }
    })

    dispatch({ type: 'DELETE_CATEGORY', payload: id })
  }

  return { createCategory, updateCategory, deleteCategory }
}
