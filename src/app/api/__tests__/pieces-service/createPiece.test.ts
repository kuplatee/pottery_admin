import { describe, it, expect } from 'vitest'
import { createPiece } from '../../graphql/graphql-server/services/pieces/piecesService'
import { NotFoundError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { designDocs } from '../common/test-data'

const input = {
  designId: 'design-1',
  imageFileNames: ['img1.jpg'],
  sold: false
}

describe('Create piece in database', () => {
  it('writes to the pieces collection', async () => {
    const db = makeMockDb([designDocs[0]])
    await createPiece(db as any, input)

    expect(db.collection).toHaveBeenCalledWith('pieces')
  })

  it('calls set with the correct data', async () => {
    const db = makeMockDb([designDocs[0]])
    const docRef = db.collection('pieces').doc()
    await createPiece(db as any, input)

    expect(docRef.set).toHaveBeenCalledWith({
      designId: 'design-1',
      imageFileNames: ['img1.jpg'],
      sold: false
    })
  })

  it('calls set with collectionId when provided', async () => {
    const db = makeMockDb([designDocs[0]])
    const docRef = db.collection('pieces').doc()
    await createPiece(db as any, { ...input, collectionId: 'col-1' })

    expect(docRef.set).toHaveBeenCalledWith({
      designId: 'design-1',
      imageFileNames: ['img1.jpg'],
      sold: false,
      collectionId: 'col-1'
    })
  })

  it('returns the created piece with the generated id', async () => {
    const db = makeMockDb([designDocs[0]])
    const result = await createPiece(db as any, input)

    expect(result).toEqual({ id: 'generated-id', ...input })
  })

  it('throws when the design does not exist', async () => {
    const db = makeMockDb()
    const promise = createPiece(db as any, input)
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Design not found: design-1')
  })
})
