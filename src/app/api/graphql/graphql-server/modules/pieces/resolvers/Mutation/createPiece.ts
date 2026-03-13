import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createPiece as createPieceService } from '../../../../services/pieces/piecesService'

export const createPiece: NonNullable<
  MutationResolvers['createPiece']
> = async (_parent, { input }, ctx) => {
  return createPieceService(ctx.db, {
    ...input,
    collectionId: input.collectionId || undefined
  })
}
