import { describe, it, expect } from 'vitest'
import { getDesign } from '../../graphql/graphql-server/services/designs/designsService'
import { NotFoundError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { designDocs } from '../common/test-data'

describe('Get single design from database', () => {
  it('queries the designs collection with the given id', async () => {
    const db = makeMockDb(designDocs)
    await getDesign(db as any, 'design-1')

    expect(db.collection).toHaveBeenCalledWith('designs')
  })

  it('returns the matching design when it exists', async () => {
    const db = makeMockDb([designDocs[0]])
    const result = await getDesign(db as any, 'design-1')

    expect(result).toEqual({
      id: 'design-1',
      names: { en: 'Wave', fi: 'Aalto' },
      categoryIds: ['cat-1'],
      description: { en: 'A wave pattern', fi: 'Aalto-kuvio' },
      details: { en: { height: '10cm' }, fi: { korkeus: '10cm' } }
    })
  })

  it('throws NotFoundError when the design does not exist', async () => {
    const db = makeMockDb()

    await expect(getDesign(db as any, 'nonexistent')).rejects.toThrow(NotFoundError)
  })
})
