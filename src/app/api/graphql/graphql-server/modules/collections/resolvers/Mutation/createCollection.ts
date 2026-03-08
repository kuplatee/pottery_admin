import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { createCollection as createCollectionService } from '../../../../services/collections/collectionsService'

export const createCollection: NonNullable<
  MutationResolvers['createCollection']
> = async (_parent, { input }, ctx) => {
  return createCollectionService(ctx.db, input)
}
