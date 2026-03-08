import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getAllPieces } from '../../../../services/pieces/piecesService'

export const pieces: NonNullable<QueryResolvers['pieces']> = async (
  _parent,
  _arg,
  ctx
) => {
  return getAllPieces(ctx.db)
}
