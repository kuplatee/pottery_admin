import { describe, it, expect } from 'vitest'
import { getCategory } from '../../graphql/graphql-server/services/categories/categoriesService'
import { makeMockDb } from '../common/mock-db'
import { categoryDocs } from '../common/test-data'

describe('Get single category from database', () => {
  it('queries the categories collection with the given id', async () => {
    const db = makeMockDb(categoryDocs)
    await getCategory(db as any, 'cat-1')

    expect(db.collection).toHaveBeenCalledWith('categories')
  })

  it('returns the matching category when it exists', async () => {
    const db = makeMockDb([categoryDocs[0]])
    const result = await getCategory(db as any, 'cat-1')

    expect(result).toEqual({ id: 'cat-1', names: { en: 'Cups', fi: 'Kupit' } })
  })

  it('returns null when the category does not exist', async () => {
    const db = makeMockDb()
    const result = await getCategory(db as any, 'nonexistent')

    expect(result).toBeNull()
  })
})
