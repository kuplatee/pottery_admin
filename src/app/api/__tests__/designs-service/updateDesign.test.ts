import { describe, it, expect } from 'vitest'
import { updateDesign } from '../../graphql/graphql-server/services/designs/designsService'
import { NotFoundError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { designDocs } from '../common/test-data'

const input = {
  id: 'design-1',
  names: { en: 'Wave Revised', fi: 'Aalto Uudistettu' },
  categoryIds: ['cat-1'],
  description: { en: 'Updated wave pattern', fi: 'Päivitetty aalto-kuvio' },
  details: { en: { height: '12cm' }, fi: { korkeus: '12cm' } }
}

describe('Update design in database', () => {
  it('queries the designs collection with the given id', async () => {
    const db = makeMockDb([designDocs[0]])
    await updateDesign(db as any, input)

    expect(db.collection).toHaveBeenCalledWith('designs')
  })

  it('calls update with the correct data', async () => {
    const db = makeMockDb([designDocs[0]])
    const docRef = db.collection('designs').doc()
    await updateDesign(db as any, input)

    expect(docRef.update).toHaveBeenCalledWith({
      names: { en: 'Wave Revised', fi: 'Aalto Uudistettu' },
      categoryIds: ['cat-1'],
      description: { en: 'Updated wave pattern', fi: 'Päivitetty aalto-kuvio' },
      details: { en: { height: '12cm' }, fi: { korkeus: '12cm' } }
    })
  })

  it('returns the updated design', async () => {
    const db = makeMockDb([designDocs[0]])
    const result = await updateDesign(db as any, input)

    expect(result).toEqual(input)
  })

  it('throws when the design does not exist', async () => {
    const db = makeMockDb()
    const promise = updateDesign(db as any, input)
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Design not found: design-1')
  })
})
