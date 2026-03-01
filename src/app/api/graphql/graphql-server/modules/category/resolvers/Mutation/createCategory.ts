import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createCategory as createCategoryService } from '../../../../services/categories/categoriesService'

export const createCategory: NonNullable<
  MutationResolvers['createCategory']
> = async (_parent, { input }, ctx) => {
  return createCategoryService(ctx.db, input)
}
