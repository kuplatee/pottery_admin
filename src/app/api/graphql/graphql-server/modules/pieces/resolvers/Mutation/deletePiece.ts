import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { deletePiece as deletePieceService } from '../../../../services/pieces/piecesService'

export const deletePiece: NonNullable<
  MutationResolvers['deletePiece']
> = async (_parent, { id }, ctx) => {
  return deletePieceService(ctx.db, id)
}
