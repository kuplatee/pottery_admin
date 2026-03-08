import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getPiece } from '../../../../services/pieces/piecesService'

export const piece: NonNullable<QueryResolvers['piece']> = async (
  _parent,
  { id },
  ctx
) => {
  return getPiece(ctx.db, id)
}
