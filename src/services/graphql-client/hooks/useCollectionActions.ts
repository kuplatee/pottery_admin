'use client'

import type { Collection } from '@/types/graphql-schema-types.generated'
import type { CreateCollectionInput, UpdateCollectionInput } from '@/types/graphql-schema-types.generated'
import {
  CreateCollectionMutation,
  CreateCollectionDocument,
  UpdateCollectionMutation,
  UpdateCollectionDocument,
  DeleteCollectionDocument
} from '../graphql-queries/collections.generated'
import { createEntityActions } from './createEntityActions'

export const useCollectionActions = createEntityActions<
  Collection,
  CreateCollectionInput,
  UpdateCollectionInput,
  CreateCollectionMutation,
  UpdateCollectionMutation
>({
  namespace: 'pages.collections',
  documents: {
    create: CreateCollectionDocument,
    update: UpdateCollectionDocument,
    delete: DeleteCollectionDocument
  },
  extract: {
    create: (data) => data.createCollection,
    update: (data) => data.updateCollection
  },
  toAction: {
    add: (entity) => ({ type: 'ADD_COLLECTION', payload: entity }),
    update: (entity) => ({ type: 'UPDATE_COLLECTION', payload: entity }),
    remove: (id) => ({ type: 'DELETE_COLLECTION', payload: id })
  }
})
