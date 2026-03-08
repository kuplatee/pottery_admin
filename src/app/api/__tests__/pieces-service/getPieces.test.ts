import { describe, it, expect } from 'vitest'
import { getAllPieces } from '../../graphql/graphql-server/services/pieces/piecesService'
import { makeMockDb } from '../common/mock-db'
import { pieceDocs } from '../common/test-data'

describe('Get pieces from database', () => {
  it('queries the pieces collection', async () => {
    const db = makeMockDb(pieceDocs)
    await getAllPieces(db as any)

    expect(db.collection).toHaveBeenCalledWith('pieces')
  })

  it('returns all pieces present in the database', async () => {
    const db = makeMockDb(pieceDocs)
    const result = await getAllPieces(db as any)

    expect(result).toEqual([
      { id: 'piece-1', designId: 'design-1', imageFileNames: ['img1.jpg'], sold: false, collectionId: 'col-1' },
      { id: 'piece-2', designId: 'design-2', imageFileNames: ['img2.jpg', 'img3.jpg'], sold: true, collectionId: undefined }
    ])
  })

  it('returns empty array when no documents exist', async () => {
    const db = makeMockDb()
    const result = await getAllPieces(db as any)

    expect(result).toEqual([])
  })
})
