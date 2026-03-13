import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updatePiece as updatePieceService } from '../../../../services/pieces/piecesService'
import { validateInput } from '../../../../validation/validate'
import { validateUpdatePiece } from '../../../../validation/schemas/piece.schemas'

export const updatePiece: NonNullable<
  MutationResolvers['updatePiece']
> = async (_parent, { input }, ctx) => {
  validateInput(validateUpdatePiece, input)
  return updatePieceService(ctx.db, {
    ...input,
    collectionId: input.collectionId || undefined,
  })
}
