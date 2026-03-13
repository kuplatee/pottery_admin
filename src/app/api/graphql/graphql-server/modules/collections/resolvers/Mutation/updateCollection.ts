import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updateCollection as updateCollectionService } from '../../../../services/collections/collectionsService'
import { validateInput } from '../../../../validation/validate'
import { validateUpdateCollection } from '../../../../validation/schemas/collection.schemas'

export const updateCollection: NonNullable<
  MutationResolvers['updateCollection']
> = async (_parent, { input }, ctx) => {
  validateInput(validateUpdateCollection, input)
  return updateCollectionService(ctx.db, input)
}
