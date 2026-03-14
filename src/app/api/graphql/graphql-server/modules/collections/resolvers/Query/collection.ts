import type { QueryResolvers } from './../../../generated-types-and-defs/resolverTypes.generated'
import { getCollection } from '../../../../services/collections/collectionsService'
import { NotFoundError } from '../../../../errors/AppError'

export const collection: NonNullable<QueryResolvers['collection']> = async (
  _parent,
  { id },
  ctx
) => {
  try {
    return await getCollection(ctx.db, id)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }
    throw error
  }
}
