import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getAllCategories } from '../../../../services/categories/categoriesService'

export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  _arg,
  ctx
) => {
  return getAllCategories(ctx.db)
}
