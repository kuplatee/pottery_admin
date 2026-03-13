import { describe, it, expect } from 'vitest'
import { deleteCategory } from '../../graphql/graphql-server/services/categories/categoriesService'
import { NotFoundError, ReferentialIntegrityError } from '../../graphql/graphql-server/errors/AppError'
import { makeMockDb } from '../common/mock-db'
import { categoryDocs } from '../common/test-data'

describe('Delete category from database', () => {
  it('queries the categories collection with the given id', async () => {
    const db = makeMockDb([categoryDocs[0]])
    await deleteCategory(db as any, 'cat-1')

    expect(db.collection).toHaveBeenCalledWith('categories')
  })

  it('calls delete on the correct document', async () => {
    const db = makeMockDb([categoryDocs[0]])
    const docRef = db.collection('categories').doc()
    await deleteCategory(db as any, 'cat-1')

    expect(docRef.delete).toHaveBeenCalled()
  })

  it('returns the deleted category id', async () => {
    const db = makeMockDb([categoryDocs[0]])
    const result = await deleteCategory(db as any, 'cat-1')

    expect(result).toBe('cat-1')
  })

  it('throws when the category does not exist', async () => {
    const db = makeMockDb()
    const promise = deleteCategory(db as any, 'nonexistent')
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
    await expect(promise).rejects.toThrow('Category not found: nonexistent')
  })

  it('throws when the category is referenced by one or more designs', async () => {
    const db = makeMockDb([categoryDocs[0]], { hasReferencingDocs: true })
    const promise = deleteCategory(db as any, 'cat-1')
    await expect(promise).rejects.toBeInstanceOf(ReferentialIntegrityError)
    await expect(promise).rejects.toThrow('Category cannot be deleted, referenced by one or more designs: cat-1')
  })
})
