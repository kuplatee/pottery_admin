import { describe, it, expect } from 'vitest'
import { updateCategory } from '../../graphql/graphql-server/services/categories/categoriesService'
import { NotFoundError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { categoryDocs } from '../common/test-data'

describe('Update category in database', () => {
  it('queries the categories collection with the given id', async () => {
    const db = makeMockDb([categoryDocs[0]])
    await updateCategory(db as any, { id: 'cat-1', names: { en: 'Mugs', fi: 'Mukit' } })

    expect(db.collection).toHaveBeenCalledWith('categories')
  })

  it('calls update with the correct data', async () => {
    const db = makeMockDb([categoryDocs[0]])
    const docRef = db.collection('categories').doc()
    await updateCategory(db as any, { id: 'cat-1', names: { en: 'Mugs', fi: 'Mukit' } })

    expect(docRef.update).toHaveBeenCalledWith({
      names: { en: 'Mugs', fi: 'Mukit' }
    })
  })

  it('returns the updated category', async () => {
    const db = makeMockDb([categoryDocs[0]])
    const result = await updateCategory(db as any, { id: 'cat-1', names: { en: 'Mugs', fi: 'Mukit' } })

    expect(result).toEqual({ id: 'cat-1', names: { en: 'Mugs', fi: 'Mukit' } })
  })

  it('throws when the category does not exist', async () => {
    const db = makeMockDb()
    const promise = updateCategory(db as any, { id: 'nonexistent', names: { en: 'Mugs', fi: 'Mukit' } })
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Category not found: nonexistent')
  })
})
