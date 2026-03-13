import { describe, it, expect } from 'vitest'
import { deleteDesign } from '../../graphql/graphql-server/services/designs/designsService'
import { NotFoundError, ReferentialIntegrityError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { designDocs } from '../common/test-data'

describe('Delete design from database', () => {
  it('queries the designs collection with the given id', async () => {
    const db = makeMockDb([designDocs[0]])
    await deleteDesign(db as any, 'design-1')

    expect(db.collection).toHaveBeenCalledWith('designs')
  })

  it('calls delete on the correct document', async () => {
    const db = makeMockDb([designDocs[0]])
    const docRef = db.collection('designs').doc()
    await deleteDesign(db as any, 'design-1')

    expect(docRef.delete).toHaveBeenCalled()
  })

  it('returns the deleted design id', async () => {
    const db = makeMockDb([designDocs[0]])
    const result = await deleteDesign(db as any, 'design-1')

    expect(result).toBe('design-1')
  })

  it('throws when the design does not exist', async () => {
    const db = makeMockDb()
    const promise = deleteDesign(db as any, 'nonexistent')
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Design not found: nonexistent')
  })

  it('throws when the design is referenced by one or more pieces', async () => {
    const db = makeMockDb([designDocs[0]], { hasReferencingDocs: true })
    const promise = deleteDesign(db as any, 'design-1')
    await expect(promise).rejects.toBeInstanceOf(ReferentialIntegrityError)
    await expect(promise).rejects.toThrow('Design cannot be deleted, referenced by one or more pieces: design-1')
  })
})
