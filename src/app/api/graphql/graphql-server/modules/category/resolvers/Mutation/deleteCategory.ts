import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { deleteCategory as deleteCategoryService } from '../../../../services/categories/categoriesService'

export const deleteCategory: NonNullable<
  MutationResolvers['deleteCategory']
> = async (_parent, { id }, _ctx) => {
  return deleteCategoryService(id)
}
