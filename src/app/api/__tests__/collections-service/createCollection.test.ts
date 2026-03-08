import { describe, it, expect } from 'vitest'
import { createCollection } from '../../graphql/graphql-server/services/collections/collectionsService'
import { makeMockDb } from '../common/mock-db'

const input = {
  names: { en: 'Cafe Latte', fi: 'Cafe Latte' },
  description: { en: 'Cozy cafe vibes', fi: 'Kodikas kahvilatunnelma' }
}

describe('Create collection in database', () => {
  it('writes to the collections collection', async () => {
    const db = makeMockDb()
    await createCollection(db as any, input)

    expect(db.collection).toHaveBeenCalledWith('collections')
  })

  it('calls set with the correct data', async () => {
    const db = makeMockDb()
    const docRef = db.collection('collections').doc()
    await createCollection(db as any, input)

    expect(docRef.set).toHaveBeenCalledWith({
      names: { en: 'Cafe Latte', fi: 'Cafe Latte' },
      description: { en: 'Cozy cafe vibes', fi: 'Kodikas kahvilatunnelma' }
    })
  })

  it('returns the created collection with the generated id', async () => {
    const db = makeMockDb()
    const result = await createCollection(db as any, input)

    expect(result).toEqual({ id: 'generated-id', ...input })
  })
})
