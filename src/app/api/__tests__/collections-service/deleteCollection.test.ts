import { describe, it, expect } from 'vitest'
import { deleteCollection } from '../../graphql/graphql-server/services/collections/collectionsService'
import { NotFoundError, ReferentialIntegrityError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { collectionDocs } from '../common/test-data'

describe('Delete collection from database', () => {
  it('queries the collections collection with the given id', async () => {
    const db = makeMockDb([collectionDocs[0]])
    await deleteCollection(db as any, 'col-1')

    expect(db.collection).toHaveBeenCalledWith('collections')
  })

  it('calls delete on the correct document', async () => {
    const db = makeMockDb([collectionDocs[0]])
    const docRef = db.collection('collections').doc()
    await deleteCollection(db as any, 'col-1')

    expect(docRef.delete).toHaveBeenCalled()
  })

  it('returns the deleted collection id', async () => {
    const db = makeMockDb([collectionDocs[0]])
    const result = await deleteCollection(db as any, 'col-1')

    expect(result).toBe('col-1')
  })

  it('throws when the collection does not exist', async () => {
    const db = makeMockDb()
    const promise = deleteCollection(db as any, 'nonexistent')
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Collection not found: nonexistent')
  })

  it('throws when the collection is referenced by one or more pieces', async () => {
    const db = makeMockDb([collectionDocs[0]], { hasReferencingDocs: true })
    const promise = deleteCollection(db as any, 'col-1')
    await expect(promise).rejects.toBeInstanceOf(ReferentialIntegrityError)
    await expect(promise).rejects.toThrow('Collection cannot be deleted, referenced by one or more pieces: col-1')
  })
})
