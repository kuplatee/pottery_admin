import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createDesign as createDesignService } from '../../../../services/designs/designsService'

export const createDesign: NonNullable<
  MutationResolvers['createDesign']
> = async (_parent, { input }, ctx) => {
  return createDesignService(ctx.db, input)
}
