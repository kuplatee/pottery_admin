import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getCategories } from '../../../../services/categories/categoriesService'

export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return getCategories()
}
