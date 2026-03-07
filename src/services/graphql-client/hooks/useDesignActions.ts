'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import {
  CreateDesignDocument,
  UpdateDesignDocument,
  DeleteDesignDocument,
  type CreateDesignMutation,
  type UpdateDesignMutation,
  type DeleteDesignMutation
} from '@/services/graphql-client/graphql-queries/queries.generated'
import type { CreateDesignInput, UpdateDesignInput } from '@/types/graphql-schema-types.generated'

export function useDesignActions() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  async function createDesign(input: CreateDesignInput): Promise<void> {
    const result = await client.mutate<CreateDesignMutation>({
      mutation: CreateDesignDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'ADD_DESIGN', payload: result.data.createDesign })
    }
  }

  async function updateDesign(input: UpdateDesignInput): Promise<void> {
    const result = await client.mutate<UpdateDesignMutation>({
      mutation: UpdateDesignDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'UPDATE_DESIGN', payload: result.data.updateDesign })
    }
  }

  async function deleteDesign(id: string): Promise<void> {
    await client.mutate<DeleteDesignMutation>({
      mutation: DeleteDesignDocument,
      variables: { id }
    })

    dispatch({ type: 'DELETE_DESIGN', payload: id })
  }

  return { createDesign, updateDesign, deleteDesign }
}
