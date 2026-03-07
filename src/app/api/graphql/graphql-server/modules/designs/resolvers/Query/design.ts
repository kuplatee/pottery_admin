import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getDesign } from '../../../../services/designs/designsService'

export const design: NonNullable<QueryResolvers['design']> = async (
  _parent,
  { id },
  ctx
) => {
  return getDesign(ctx.db, id)
}
