'use client'

import type { CreateCollectionInput, UpdateCollectionInput } from '@/types/graphql-schema-types.generated'
import {
  CreateCollectionDocument,
  UpdateCollectionDocument,
  DeleteCollectionDocument,
  GetAllCollectionsDocument
} from '../graphql-queries/collections.generated'
import { createEntityActions } from './createEntityActions'

export const useCollectionActions = createEntityActions<CreateCollectionInput, UpdateCollectionInput>({
  namespace: 'pages.collections',
  documents: {
    create: CreateCollectionDocument,
    update: UpdateCollectionDocument,
    delete: DeleteCollectionDocument
  },
  refetchQueries: [GetAllCollectionsDocument]
})
