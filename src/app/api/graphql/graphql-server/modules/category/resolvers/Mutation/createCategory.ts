import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createCategory as createCategoryService } from '../../../../services/categories/categoriesService'
import { validateInput } from '../../../../validation/validate'
import { validateCreateCategory } from '../../../../validation/schemas/category.schemas'

export const createCategory: NonNullable<
  MutationResolvers['createCategory']
> = async (_parent, { input }, ctx) => {
  validateInput(validateCreateCategory, input)
  return createCategoryService(ctx.db, input)
}
