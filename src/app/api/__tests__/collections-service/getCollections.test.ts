import { describe, it, expect } from 'vitest'
import { getAllCollections } from '../../graphql/graphql-server/services/collections/collectionsService'
import { makeMockDb } from '../common/mock-db'
import { collectionDocs } from '../common/test-data'

describe('Get collections from database', () => {
  it('queries the collections collection', async () => {
    const db = makeMockDb(collectionDocs)
    await getAllCollections(db as any)

    expect(db.collection).toHaveBeenCalledWith('collections')
  })

  it('returns all collections present in the database', async () => {
    const db = makeMockDb(collectionDocs)
    const result = await getAllCollections(db as any)

    expect(result).toEqual([
      { id: 'col-1', names: { en: 'Cafe Latte', fi: 'Cafe Latte' }, description: { en: 'Cozy cafe vibes', fi: 'Kodikas kahvilatunnelma' } },
      { id: 'col-2', names: { en: 'Forest', fi: 'Metsä' }, description: { en: 'Inspired by forests', fi: 'Metsän inspiroimana' } }
    ])
  })

  it('returns empty array when no documents exist', async () => {
    const db = makeMockDb()
    const result = await getAllCollections(db as any)

    expect(result).toEqual([])
  })
})
