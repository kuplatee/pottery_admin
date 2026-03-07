import { describe, it, expect } from 'vitest'
import { createDesign } from '../../graphql/graphql-server/services/designs/designsService'
import { makeMockDb } from '../common/mock-db'
import { categoryDocs } from '../common/test-data'

const input = {
  names: { en: 'Wave', fi: 'Aalto' },
  categoryIds: ['cat-1'],
  description: { en: 'A wave pattern', fi: 'Aalto-kuvio' },
  details: { en: { height: '10cm' }, fi: { korkeus: '10cm' } }
}

describe('Create design in database', () => {
  it('writes to the designs collection', async () => {
    const db = makeMockDb(categoryDocs)
    await createDesign(db as any, input)

    expect(db.collection).toHaveBeenCalledWith('designs')
  })

  it('calls set with the correct data', async () => {
    const db = makeMockDb(categoryDocs)
    const docRef = db.collection('designs').doc()
    await createDesign(db as any, input)

    expect(docRef.set).toHaveBeenCalledWith({
      names: { en: 'Wave', fi: 'Aalto' },
      categoryIds: ['cat-1'],
      description: { en: 'A wave pattern', fi: 'Aalto-kuvio' },
      details: { en: { height: '10cm' }, fi: { korkeus: '10cm' } }
    })
  })

  it('returns the created design with the generated id', async () => {
    const db = makeMockDb(categoryDocs)
    const result = await createDesign(db as any, input)

    expect(result).toEqual({ id: 'generated-id', ...input })
  })

  it('throws when a categoryId does not exist', async () => {
    const db = makeMockDb()
    await expect(createDesign(db as any, input)).rejects.toThrow(
      'Category with id "cat-1" not found'
    )
  })
})
