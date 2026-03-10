'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'

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
    const result = await client.mutate<CreateCollectionMutation>({
      mutation: CreateCollectionDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'ADD_COLLECTION', payload: result.data.createCollection })
    }
  }

  async function updateCollection(input: UpdateCollectionInput): Promise<void> {
    const result = await client.mutate<UpdateCollectionMutation>({
      mutation: UpdateCollectionDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'UPDATE_COLLECTION', payload: result.data.updateCollection })
    }
  }

  async function deleteCollection(id: string): Promise<void> {
    await client.mutate<DeleteCollectionMutation>({
      mutation: DeleteCollectionDocument,
      variables: { id }
    })

    dispatch({ type: 'DELETE_COLLECTION', payload: id })
  }

  return { createCollection, updateCollection, deleteCollection }
}
