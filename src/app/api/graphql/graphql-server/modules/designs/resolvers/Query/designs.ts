import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getAllDesigns } from '../../../../services/designs/designsService'

export const designs: NonNullable<QueryResolvers['designs']> = async (
  _parent,
  _arg,
  ctx
) => {
  return getAllDesigns(ctx.db)
}
