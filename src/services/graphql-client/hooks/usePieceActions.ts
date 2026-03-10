'use client'

import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'

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
    const result = await client.mutate<CreatePieceMutation>({
      mutation: CreatePieceDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'ADD_PIECE', payload: result.data.createPiece })
    }
  }

  async function updatePiece(input: UpdatePieceInput): Promise<void> {
    const result = await client.mutate<UpdatePieceMutation>({
      mutation: UpdatePieceDocument,
      variables: { input }
    })

    if (result.data) {
      dispatch({ type: 'UPDATE_PIECE', payload: result.data.updatePiece })
    }
  }

  async function deletePiece(id: string): Promise<void> {
    await client.mutate<DeletePieceMutation>({
      mutation: DeletePieceDocument,
      variables: { id }
    })

    dispatch({ type: 'DELETE_PIECE', payload: id })
  }

  return { createPiece, updatePiece, deletePiece }
}
