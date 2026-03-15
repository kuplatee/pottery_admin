'use client'

import type { Category } from '@/types/graphql-schema-types.generated'
import type { CreateCategoryInput, UpdateCategoryInput } from '@/types/graphql-schema-types.generated'
import {
  CreateCategoryMutation,
  CreateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryDocument,
  DeleteCategoryDocument
} from '../graphql-queries/categories.generated'
import { createEntityActions } from './createEntityActions'

export const useCategoryActions = createEntityActions<
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateCategoryMutation,
  UpdateCategoryMutation
>({
  namespace: 'pages.categories',
  documents: {
    create: CreateCategoryDocument,
    update: UpdateCategoryDocument,
    delete: DeleteCategoryDocument
  },
  extract: {
    create: (data) => data.createCategory,
    update: (data) => data.updateCategory
  },
  toAction: {
    add: (entity) => ({ type: 'ADD_CATEGORY', payload: entity }),
    update: (entity) => ({ type: 'UPDATE_CATEGORY', payload: entity }),
    remove: (id) => ({ type: 'DELETE_CATEGORY', payload: id })
  }
})
