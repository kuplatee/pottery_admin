'use client'

import type { CreatePieceInput, UpdatePieceInput } from '@/types/graphql-schema-types.generated'
import {
  CreatePieceDocument,
  UpdatePieceDocument,
  DeletePieceDocument,
  GetAllPiecesDocument
} from '../graphql-queries/pieces.generated'
import { createEntityActions } from './createEntityActions'

export const usePieceActions = createEntityActions<CreatePieceInput, UpdatePieceInput>({
  namespace: 'pages.pieces',
  documents: {
    create: CreatePieceDocument,
    update: UpdatePieceDocument,
    delete: DeletePieceDocument
  },
  refetchQueries: [GetAllPiecesDocument]
})
