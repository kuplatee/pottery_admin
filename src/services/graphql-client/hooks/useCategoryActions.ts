'use client'

import type { CreateCategoryInput, UpdateCategoryInput } from '@/types/graphql-schema-types.generated'
import {
  CreateCategoryDocument,
  UpdateCategoryDocument,
  DeleteCategoryDocument,
  GetAllCategoriesDocument
} from '../graphql-queries/categories.generated'
import { createEntityActions } from './createEntityActions'

export const useCategoryActions = createEntityActions<CreateCategoryInput, UpdateCategoryInput>({
  namespace: 'pages.categories',
  documents: {
    create: CreateCategoryDocument,
    update: UpdateCategoryDocument,
    delete: DeleteCategoryDocument
  },
  refetchQueries: [GetAllCategoriesDocument]
})
