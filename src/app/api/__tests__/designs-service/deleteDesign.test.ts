import { describe, it, expect } from 'vitest'
import { deleteDesign } from '../../graphql/graphql-server/services/designs/designsService'
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
    await expect(deleteDesign(db as any, 'nonexistent')).rejects.toThrow(
      'Design with id "nonexistent" not found'
    )
  })
})
