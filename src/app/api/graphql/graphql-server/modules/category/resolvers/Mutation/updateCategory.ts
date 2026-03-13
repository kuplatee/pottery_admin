import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updateCategory as updateCategoryService } from '../../../../services/categories/categoriesService'
import { validateInput } from '../../../../validation/validate'
import { validateUpdateCategory } from '../../../../validation/schemas/category.schemas'

export const updateCategory: NonNullable<
  MutationResolvers['updateCategory']
> = async (_parent, { input }, ctx) => {
  validateInput(validateUpdateCategory, input)
  return updateCategoryService(ctx.db, input)
}
