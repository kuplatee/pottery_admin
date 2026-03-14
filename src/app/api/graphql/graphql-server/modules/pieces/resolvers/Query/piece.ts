import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getPiece } from '../../../../services/pieces/piecesService'
import { NotFoundError } from '../../../../errors/AppError'

export const piece: NonNullable<QueryResolvers['piece']> = async (
  _parent,
  { id },
  ctx
) => {
  try {
    return await getPiece(ctx.db, id)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }
    throw error
  }
}
