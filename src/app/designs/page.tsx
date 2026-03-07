'use client'

import { useAppState } from '@/state/AppStateContext'
import { EntitiesPage } from '@/components/entity-components/EntitiesPage'
import { useDesignActions } from '@/services/graphql-client/hooks/useDesignActions'

export default function DesignsPage() {
  const { state } = useAppState()
  const { createDesign, updateDesign, deleteDesign } = useDesignActions()

  return (
    <EntitiesPage
      title="Designs"
      label="Design"
      description="Manage pottery designs"
      entities={state.designs}
      onCreate={(names) =>
        createDesign({
          names,
          categoryIds: [],
          description: { en: '', fi: '' },
          details: { en: {}, fi: {} }
        })
      }
      onUpdate={(id, names) =>
        updateDesign({
          id,
          names,
          categoryIds: [],
          description: { en: '', fi: '' },
          details: { en: {}, fi: {} }
        })
      }
      onDelete={(id) => deleteDesign(id)}
    />
  )
}
