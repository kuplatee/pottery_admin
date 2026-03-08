import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getCollection } from '../../../../services/collections/collectionsService'

export const collection: NonNullable<QueryResolvers['collection']> = async (
  _parent,
  { id },
  ctx
) => {
  return getCollection(ctx.db, id)
}
