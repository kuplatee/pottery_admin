import { describe, it, expect } from 'vitest'
import { createCategory } from '../../graphql/graphql-server/services/categories/categoriesService'
import { makeMockDb } from '../common/mock-db'

describe('Create category in database', () => {
  it('writes to the categories collection', async () => {
    const db = makeMockDb()
    await createCategory(db as any, { names: { en: 'Cups', fi: 'Kupit' } })

    expect(db.collection).toHaveBeenCalledWith('categories')
  })

  it('calls set with the correct data', async () => {
    const db = makeMockDb()
    const docRef = db.collection('categories').doc()
    await createCategory(db as any, { names: { en: 'Cups', fi: 'Kupit' } })

    expect(docRef.set).toHaveBeenCalledWith({
      names: { en: 'Cups', fi: 'Kupit' }
    })
  })

  it('returns the created category with the generated id', async () => {
    const db = makeMockDb()
    const result = await createCategory(db as any, { names: { en: 'Cups', fi: 'Kupit' } })

    expect(result).toEqual({
      id: 'generated-id',
      names: { en: 'Cups', fi: 'Kupit' }
    })
  })
})
