import type { MutationResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { deleteCollection as deleteCollectionService } from '../../../../services/collections/collectionsService'

export const deleteCollection: NonNullable<
  MutationResolvers['deleteCollection']
> = async (_parent, { id }, ctx) => {
  return deleteCollectionService(ctx.db, id)
}
