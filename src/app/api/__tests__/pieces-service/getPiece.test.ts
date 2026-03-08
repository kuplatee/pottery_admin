import { describe, it, expect } from 'vitest'
import { getPiece } from '../../graphql/graphql-server/services/pieces/piecesService'
import { makeMockDb } from '../common/mock-db'
import { pieceDocs } from '../common/test-data'

describe('Get single piece from database', () => {
  it('queries the pieces collection with the given id', async () => {
    const db = makeMockDb(pieceDocs)
    await getPiece(db as any, 'piece-1')

    expect(db.collection).toHaveBeenCalledWith('pieces')
  })

  it('returns the matching piece when it exists', async () => {
    const db = makeMockDb([pieceDocs[0]])
    const result = await getPiece(db as any, 'piece-1')

    expect(result).toEqual({
      id: 'piece-1',
      designId: 'design-1',
      imageFileNames: ['img1.jpg'],
      sold: false,
      collectionId: 'col-1'
    })
  })

  it('returns null when the piece does not exist', async () => {
    const db = makeMockDb()
    const result = await getPiece(db as any, 'nonexistent')

    expect(result).toBeNull()
  })
})
