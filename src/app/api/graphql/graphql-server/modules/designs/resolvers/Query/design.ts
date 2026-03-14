import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getDesign } from '../../../../services/designs/designsService'
import { NotFoundError } from '../../../../errors/AppError'

export const design: NonNullable<QueryResolvers['design']> = async (
  _parent,
  { id },
  ctx
) => {
  try {
    return await getDesign(ctx.db, id)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }
    throw error
  }
}
