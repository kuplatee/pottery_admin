'use client'

import type { Design } from '@/types/graphql-schema-types.generated'
import type { CreateDesignInput, UpdateDesignInput } from '@/types/graphql-schema-types.generated'
import {
  CreateDesignMutation,
  CreateDesignDocument,
  UpdateDesignMutation,
  UpdateDesignDocument,
  DeleteDesignDocument
} from '../graphql-queries/designs.generated'
import { createEntityActions } from './createEntityActions'

export const useDesignActions = createEntityActions<
  Design,
  CreateDesignInput,
  UpdateDesignInput,
  CreateDesignMutation,
  UpdateDesignMutation
>({
  namespace: 'pages.designs',
  documents: {
    create: CreateDesignDocument,
    update: UpdateDesignDocument,
    delete: DeleteDesignDocument
  },
  extract: {
    create: (data) => data.createDesign,
    update: (data) => data.updateDesign
  },
  toAction: {
    add: (entity) => ({ type: 'ADD_DESIGN', payload: entity }),
    update: (entity) => ({ type: 'UPDATE_DESIGN', payload: entity }),
    remove: (id) => ({ type: 'DELETE_DESIGN', payload: id })
  }
})
