'use client'

import type { Piece } from '@/types/graphql-schema-types.generated'
import type { CreatePieceInput, UpdatePieceInput } from '@/types/graphql-schema-types.generated'
import {
  CreatePieceMutation,
  CreatePieceDocument,
  UpdatePieceMutation,
  UpdatePieceDocument,
  DeletePieceDocument
} from '../graphql-queries/pieces.generated'
import { createEntityActions } from './createEntityActions'

export const usePieceActions = createEntityActions<
  Piece,
  CreatePieceInput,
  UpdatePieceInput,
  CreatePieceMutation,
  UpdatePieceMutation
>({
  namespace: 'pages.pieces',
  documents: {
    create: CreatePieceDocument,
    update: UpdatePieceDocument,
    delete: DeletePieceDocument
  },
  extract: {
    create: (data) => data.createPiece,
    update: (data) => data.updatePiece
  },
  toAction: {
    add: (entity) => ({ type: 'ADD_PIECE', payload: entity }),
    update: (entity) => ({ type: 'UPDATE_PIECE', payload: entity }),
    remove: (id) => ({ type: 'DELETE_PIECE', payload: id })
  }
})
