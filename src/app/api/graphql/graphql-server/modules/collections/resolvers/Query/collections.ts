import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getAllCollections } from '../../../../services/collections/collectionsService'

export const collections: NonNullable<QueryResolvers['collections']> = async (
  _parent,
  _arg,
  ctx
) => {
  return getAllCollections(ctx.db)
}
