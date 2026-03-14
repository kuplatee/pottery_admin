import { describe, it, expect } from 'vitest'
import { getCollection } from '../../graphql/graphql-server/services/collections/collectionsService'
import { NotFoundError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { collectionDocs } from '../common/test-data'

describe('Get single collection from database', () => {
  it('queries the collections collection with the given id', async () => {
    const db = makeMockDb(collectionDocs)
    await getCollection(db as any, 'col-1')

    expect(db.collection).toHaveBeenCalledWith('collections')
  })

  it('returns the matching collection when it exists', async () => {
    const db = makeMockDb([collectionDocs[0]])
    const result = await getCollection(db as any, 'col-1')

    expect(result).toEqual({
      id: 'col-1',
      names: { en: 'Cafe Latte', fi: 'Cafe Latte' },
      description: { en: 'Cozy cafe vibes', fi: 'Kodikas kahvilatunnelma' }
    })
  })

  it('throws NotFoundError when the collection does not exist', async () => {
    const db = makeMockDb()

    await expect(getCollection(db as any, 'nonexistent')).rejects.toThrow(NotFoundError)
  })
})
