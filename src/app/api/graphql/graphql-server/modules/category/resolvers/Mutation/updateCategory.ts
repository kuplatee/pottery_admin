import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updateCategory as updateCategoryService } from '../../../../services/categories/categoriesService'

export const updateCategory: NonNullable<
  MutationResolvers['updateCategory']
> = async (_parent, { input }, ctx) => {
  return updateCategoryService(ctx.db, input)
}
