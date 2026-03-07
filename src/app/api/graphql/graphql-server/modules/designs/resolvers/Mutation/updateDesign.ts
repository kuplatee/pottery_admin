import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updateDesign as updateDesignService } from '../../../../services/designs/designsService'

export const updateDesign: NonNullable<
  MutationResolvers['updateDesign']
> = async (_parent, { input }, ctx) => {
  return updateDesignService(ctx.db, input)
}
