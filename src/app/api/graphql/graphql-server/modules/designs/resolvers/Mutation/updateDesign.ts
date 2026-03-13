import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updateDesign as updateDesignService } from '../../../../services/designs/designsService'
import { validateInput } from '../../../../validation/validate'
import { validateUpdateDesign } from '../../../../validation/schemas/design.schemas'

export const updateDesign: NonNullable<
  MutationResolvers['updateDesign']
> = async (_parent, { input }, ctx) => {
  validateInput(validateUpdateDesign, input)
  return updateDesignService(ctx.db, input)
}
