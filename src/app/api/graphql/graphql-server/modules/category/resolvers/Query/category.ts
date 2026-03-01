import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getCategory } from '../../../../services/categories/categoriesService'

export const category: NonNullable<QueryResolvers['category']> = async (
  _parent,
  { id },
  _ctx
) => {
  return getCategory(id)
}
