'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import { withToast } from '@/services/toast/withToast'

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
    await withToast(
      async () => {
        const result = await client.mutate<CreateCategoryMutation>({
          mutation: CreateCategoryDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({
            type: 'ADD_CATEGORY',
            payload: result.data.createCategory
          })
        }
      },
      { success: 'Category created', error: 'Failed to create category' }
    )
  }

  async function updateCategory(input: UpdateCategoryInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<UpdateCategoryMutation>({
          mutation: UpdateCategoryDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({
            type: 'UPDATE_CATEGORY',
            payload: result.data.updateCategory
          })
        }
      },
      { success: 'Category updated', error: 'Failed to update category' }
    )
  }

  async function deleteCategory(id: string): Promise<void> {
    await withToast(
      async () => {
        await client.mutate<DeleteCategoryMutation>({
          mutation: DeleteCategoryDocument,
          variables: { id }
        })

        dispatch({ type: 'DELETE_CATEGORY', payload: id })
      },
      { error: 'Failed to delete category' }
    )
  }

  return { createCategory, updateCategory, deleteCategory }
}
