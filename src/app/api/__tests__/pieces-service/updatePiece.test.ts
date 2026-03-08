import { describe, it, expect } from 'vitest'
import { updatePiece } from '../../graphql/graphql-server/services/pieces/piecesService'
import { makeMockDb } from '../common/mock-db'
import { pieceDocs } from '../common/test-data'

const input = {
  id: 'piece-1',
  designId: 'design-1',
  imageFileNames: ['img1.jpg', 'img2.jpg'],
  sold: true
}

describe('Update piece in database', () => {
  it('queries the pieces collection with the given id', async () => {
    const db = makeMockDb([pieceDocs[0]])
    await updatePiece(db as any, input)

    expect(db.collection).toHaveBeenCalledWith('pieces')
  })

  it('calls update with the correct data', async () => {
    const db = makeMockDb([pieceDocs[0]])
    const docRef = db.collection('pieces').doc()
    await updatePiece(db as any, input)

    expect(docRef.update).toHaveBeenCalledWith({
      designId: 'design-1',
      imageFileNames: ['img1.jpg', 'img2.jpg'],
      sold: true
    })
  })

  it('calls update with collectionId when provided', async () => {
    const db = makeMockDb([pieceDocs[0]])
    const docRef = db.collection('pieces').doc()
    await updatePiece(db as any, { ...input, collectionId: 'col-1' })

    expect(docRef.update).toHaveBeenCalledWith({
      designId: 'design-1',
      imageFileNames: ['img1.jpg', 'img2.jpg'],
      sold: true,
      collectionId: 'col-1'
    })
  })

  it('returns the updated piece', async () => {
    const db = makeMockDb([pieceDocs[0]])
    const result = await updatePiece(db as any, input)

    expect(result).toEqual(input)
  })

  it('throws when the piece does not exist', async () => {
    const db = makeMockDb()
    await expect(updatePiece(db as any, input)).rejects.toThrow(
      'Piece with id "piece-1" not found'
    )
  })
})
