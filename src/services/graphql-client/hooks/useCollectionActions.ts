'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import { withToast } from '@/services/toast/withToast'

import type {
  CreateCollectionInput,
  UpdateCollectionInput
} from '@/types/graphql-schema-types.generated'
import {
  CreateCollectionMutation,
  CreateCollectionDocument,
  UpdateCollectionMutation,
  UpdateCollectionDocument,
  DeleteCollectionMutation,
  DeleteCollectionDocument
} from '../graphql-queries/collections.generated'

export function useCollectionActions() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  async function createCollection(input: CreateCollectionInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<CreateCollectionMutation>({
          mutation: CreateCollectionDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({
            type: 'ADD_COLLECTION',
            payload: result.data.createCollection
          })
        }
      },
      { success: 'Collection created', error: 'Failed to create collection' }
    )
  }

  async function updateCollection(input: UpdateCollectionInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<UpdateCollectionMutation>({
          mutation: UpdateCollectionDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({
            type: 'UPDATE_COLLECTION',
            payload: result.data.updateCollection
          })
        }
      },
      { success: 'Collection updated', error: 'Failed to update collection' }
    )
  }

  async function deleteCollection(id: string): Promise<void> {
    await withToast(
      async () => {
        await client.mutate<DeleteCollectionMutation>({
          mutation: DeleteCollectionDocument,
          variables: { id }
        })

        dispatch({ type: 'DELETE_COLLECTION', payload: id })
      },
      { error: 'Failed to delete collection' }
    )
  }

  return { createCollection, updateCollection, deleteCollection }
}
