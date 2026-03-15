'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import { withToast } from '@/services/toast/withToast'

import type {
  CreatePieceInput,
  UpdatePieceInput
} from '@/types/graphql-schema-types.generated'
import {
  CreatePieceMutation,
  CreatePieceDocument,
  UpdatePieceMutation,
  UpdatePieceDocument,
  DeletePieceMutation,
  DeletePieceDocument
} from '../graphql-queries/pieces.generated'

export function usePieceActions() {
  const client = useApiClient()
  const { dispatch } = useAppState()

  async function createPiece(input: CreatePieceInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<CreatePieceMutation>({
          mutation: CreatePieceDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({ type: 'ADD_PIECE', payload: result.data.createPiece })
        }
      },
      { success: 'Piece created', error: 'Failed to create piece' }
    )
  }

  async function updatePiece(input: UpdatePieceInput): Promise<void> {
    await withToast(
      async () => {
        const result = await client.mutate<UpdatePieceMutation>({
          mutation: UpdatePieceDocument,
          variables: { input }
        })

        if (result.data) {
          dispatch({ type: 'UPDATE_PIECE', payload: result.data.updatePiece })
        }
      },
      { success: 'Piece updated', error: 'Failed to update piece' }
    )
  }

  async function deletePiece(id: string): Promise<void> {
    await withToast(
      async () => {
        await client.mutate<DeletePieceMutation>({
          mutation: DeletePieceDocument,
          variables: { id }
        })

        dispatch({ type: 'DELETE_PIECE', payload: id })
      },
      { error: 'Failed to delete piece' }
    )
  }

  return { createPiece, updatePiece, deletePiece }
}
