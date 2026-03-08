import { describe, it, expect } from 'vitest'
import { updateCollection } from '../../graphql/graphql-server/services/collections/collectionsService'
import { makeMockDb } from '../common/mock-db'
import { collectionDocs } from '../common/test-data'

const input = {
  id: 'col-1',
  names: { en: 'Updated Name', fi: 'Päivitetty nimi' },
  description: { en: 'Updated description', fi: 'Päivitetty kuvaus' }
}

describe('Update collection in database', () => {
  it('queries the collections collection with the given id', async () => {
    const db = makeMockDb([collectionDocs[0]])
    await updateCollection(db as any, input)

    expect(db.collection).toHaveBeenCalledWith('collections')
  })

  it('calls update with the correct data', async () => {
    const db = makeMockDb([collectionDocs[0]])
    const docRef = db.collection('collections').doc()
    await updateCollection(db as any, input)

    expect(docRef.update).toHaveBeenCalledWith({
      names: { en: 'Updated Name', fi: 'Päivitetty nimi' },
      description: { en: 'Updated description', fi: 'Päivitetty kuvaus' }
    })
  })

  it('returns the updated collection', async () => {
    const db = makeMockDb([collectionDocs[0]])
    const result = await updateCollection(db as any, input)

    expect(result).toEqual(input)
  })

  it('throws when the collection does not exist', async () => {
    const db = makeMockDb()
    await expect(updateCollection(db as any, input)).rejects.toThrow(
      'Collection with id "col-1" not found'
    )
  })
})
