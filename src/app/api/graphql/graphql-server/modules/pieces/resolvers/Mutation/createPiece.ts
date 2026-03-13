import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createPiece as createPieceService } from '../../../../services/pieces/piecesService'
import { validateInput } from '../../../../validation/validate'
import { validateCreatePiece } from '../../../../validation/schemas/piece.schemas'

export const createPiece: NonNullable<
  MutationResolvers['createPiece']
> = async (_parent, { input }, ctx) => {
  validateInput(validateCreatePiece, input)
  return createPieceService(ctx.db, {
    ...input,
    collectionId: input.collectionId || undefined,
  })
}
