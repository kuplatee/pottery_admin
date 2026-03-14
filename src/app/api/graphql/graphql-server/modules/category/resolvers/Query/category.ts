import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getCategory } from '../../../../services/categories/categoriesService'
import { NotFoundError } from '../../../../errors/AppError'

export const category: NonNullable<QueryResolvers['category']> = async (
  _parent,
  { id },
  ctx
) => {
  try {
    return await getCategory(ctx.db, id)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }
    throw error
  }
}
