import { describe, it, expect } from 'vitest'
import { getAllCategories } from '../../graphql/graphql-server/services/categories/categoriesService'
import { makeMockDb } from '../common/mock-db'
import { categoryDocs } from './test-data'

describe('Get categories from database', () => {
  it('queries the categories collection', async () => {
    const db = makeMockDb(categoryDocs)
    await getAllCategories(db as any)

    expect(db.collection).toHaveBeenCalledWith('categories')
  })

  it('returns all categories present in the database', async () => {
    const db = makeMockDb(categoryDocs)
    const result = await getAllCategories(db as any)

    expect(result).toEqual([
      { id: 'cat-1', names: { en: 'Cups', fi: 'Kupit' } },
      { id: 'cat-2', names: { en: 'Bowls', fi: 'Kulhot' } },
      { id: 'cat-3', names: { en: 'Plates', fi: 'Lautaset' } }
    ])
  })

  it('returns empty array when no documents exist', async () => {
    const db = makeMockDb()
    const result = await getAllCategories(db as any)

    expect(result).toEqual([])
  })
})
