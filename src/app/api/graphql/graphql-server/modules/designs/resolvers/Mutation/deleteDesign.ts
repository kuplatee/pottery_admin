import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { deleteDesign as deleteDesignService } from '../../../../services/designs/designsService'

export const deleteDesign: NonNullable<
  MutationResolvers['deleteDesign']
> = async (_parent, { id }, ctx) => {
  return deleteDesignService(ctx.db, id)
}
