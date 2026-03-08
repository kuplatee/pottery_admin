import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updatePiece as updatePieceService } from '../../../../services/pieces/piecesService'

export const updatePiece: NonNullable<
  MutationResolvers['updatePiece']
> = async (_parent, { input }, ctx) => {
  return updatePieceService(ctx.db, {
    ...input,
    collectionId: input.collectionId ?? undefined
  })
}
