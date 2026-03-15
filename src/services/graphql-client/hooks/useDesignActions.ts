'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import { withToast } from '@/services/toast/withToast'

import type {
  CreateDesignInput,
  UpdateDesignInput
} from '@/types/graphql-schema-types.generated'
import {
  CreateDesignMutation,
  CreateDesignDocument,
  UpdateDesignMutation,
  UpdateDesignDocument,
  DeleteDesignMutation,
  DeleteDesignDocument
} from '../graphql-queries/designs.generated'

export function useDesignActions() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  async function createDesign(input: CreateDesignInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<CreateDesignMutation>({
          mutation: CreateDesignDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({ type: 'ADD_DESIGN', payload: result.data.createDesign })
        }
      },
      { success: 'Design created', error: 'Failed to create design' }
    )
  }

  async function updateDesign(input: UpdateDesignInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<UpdateDesignMutation>({
          mutation: UpdateDesignDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({ type: 'UPDATE_DESIGN', payload: result.data.updateDesign })
        }
      },
      { success: 'Design updated', error: 'Failed to update design' }
    )
  }

  async function deleteDesign(id: string): Promise<void> {
    await withToast(
      async () => {
        await client.mutate<DeleteDesignMutation>({
          mutation: DeleteDesignDocument,
          variables: { id }
        })

        dispatch({ type: 'DELETE_DESIGN', payload: id })
      },
      { error: 'Failed to delete design' }
    )
  }

  return { createDesign, updateDesign, deleteDesign }
}
