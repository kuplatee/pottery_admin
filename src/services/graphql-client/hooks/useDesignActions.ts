'use client'

import type { CreateDesignInput, UpdateDesignInput } from '@/types/graphql-schema-types.generated'
import {
  CreateDesignDocument,
  UpdateDesignDocument,
  DeleteDesignDocument,
  GetAllDesignsDocument
} from '../graphql-queries/designs.generated'
import { createEntityActions } from './createEntityActions'

export const useDesignActions = createEntityActions<CreateDesignInput, UpdateDesignInput>({
  namespace: 'pages.designs',
  documents: {
    create: CreateDesignDocument,
    update: UpdateDesignDocument,
    delete: DeleteDesignDocument
  },
  refetchQueries: [GetAllDesignsDocument]
})
