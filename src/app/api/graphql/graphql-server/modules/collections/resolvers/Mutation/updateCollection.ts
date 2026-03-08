import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { updateCollection as updateCollectionService } from '../../../../services/collections/collectionsService'

export const updateCollection: NonNullable<
  MutationResolvers['updateCollection']
> = async (_parent, { input }, ctx) => {
  return updateCollectionService(ctx.db, input)
}
