import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createDesign as createDesignService } from '../../../../services/designs/designsService'
import { validateInput } from '../../../../validation/validate'
import { validateCreateDesign } from '../../../../validation/schemas/design.schemas'

export const createDesign: NonNullable<
  MutationResolvers['createDesign']
> = async (_parent, { input }, ctx) => {
  validateInput(validateCreateDesign, input)
  return createDesignService(ctx.db, input)
}
