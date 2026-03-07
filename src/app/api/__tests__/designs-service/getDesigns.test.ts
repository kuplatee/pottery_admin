import { describe, it, expect } from 'vitest'
import { getAllDesigns } from '../../graphql/graphql-server/services/designs/designsService'
import { makeMockDb } from '../common/mock-db'
import { designDocs } from '../common/test-data'

describe('Get designs from database', () => {
  it('queries the designs collection', async () => {
    const db = makeMockDb(designDocs)
    await getAllDesigns(db as any)

    expect(db.collection).toHaveBeenCalledWith('designs')
  })

  it('returns all designs present in the database', async () => {
    const db = makeMockDb(designDocs)
    const result = await getAllDesigns(db as any)

    expect(result).toEqual([
      {
        id: 'design-1',
        names: { en: 'Wave', fi: 'Aalto' },
        categoryIds: ['cat-1'],
        description: { en: 'A wave pattern', fi: 'Aalto-kuvio' },
        details: { en: { height: '10cm' }, fi: { korkeus: '10cm' } }
      },
      {
        id: 'design-2',
        names: { en: 'Stone', fi: 'Kivi' },
        categoryIds: ['cat-1', 'cat-2'],
        description: { en: 'A stone texture', fi: 'Kivi-rakenne' },
        details: { en: { width: '8cm' }, fi: { leveys: '8cm' } }
      }
    ])
  })

  it('returns empty array when no documents exist', async () => {
    const db = makeMockDb()
    const result = await getAllDesigns(db as any)

    expect(result).toEqual([])
  })
})
