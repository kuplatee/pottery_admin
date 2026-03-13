import { describe, it, expect } from 'vitest'
import { deletePiece } from '../../graphql/graphql-server/services/pieces/piecesService'
import { NotFoundError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { pieceDocs } from '../common/test-data'

describe('Delete piece from database', () => {
  it('queries the pieces collection with the given id', async () => {
    const db = makeMockDb([pieceDocs[0]])
    await deletePiece(db as any, 'piece-1')

    expect(db.collection).toHaveBeenCalledWith('pieces')
  })

  it('calls delete on the correct document', async () => {
    const db = makeMockDb([pieceDocs[0]])
    const docRef = db.collection('pieces').doc()
    await deletePiece(db as any, 'piece-1')

    expect(docRef.delete).toHaveBeenCalled()
  })

  it('returns the deleted piece id', async () => {
    const db = makeMockDb([pieceDocs[0]])
    const result = await deletePiece(db as any, 'piece-1')

    expect(result).toBe('piece-1')
  })

  it('throws when the piece does not exist', async () => {
    const db = makeMockDb()
    const promise = deletePiece(db as any, 'nonexistent')
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Piece not found: nonexistent')
  })
})
