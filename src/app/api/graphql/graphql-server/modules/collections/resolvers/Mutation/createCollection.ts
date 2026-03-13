import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createCollection as createCollectionService } from '../../../../services/collections/collectionsService'
import { validateInput } from '../../../../validation/validate'
import { validateCreateCollection } from '../../../../validation/schemas/collection.schemas'

export const createCollection: NonNullable<
  MutationResolvers['createCollection']
> = async (_parent, { input }, ctx) => {
  validateInput(validateCreateCollection, input)
  return createCollectionService(ctx.db, input)
}
