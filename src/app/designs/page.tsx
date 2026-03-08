'use client'

import { useAppState } from '@/state/AppStateContext'
import { EntitiesPage } from '@/components/entity-components/EntitiesPage'
import { useDesignActions } from '@/services/graphql-client/hooks/useDesignActions'
import { toLocalizedJson } from './designFormUtils'

export default function DesignsPage() {
  const { state } = useAppState()
  const { createDesign, updateDesign, deleteDesign } = useDesignActions()

  return (
    <EntitiesPage
      title="Designs"
      label="Design"
      description="Manage pottery designs"
      fieldConfig={{
        names: true,
        description: true,
        details: true,
        categoryIds: true
      }}
      entities={state.designs}
      availableCategories={state.categories}
      onCreate={(data) =>
        createDesign({
          names: data.names!,
          categoryIds: data.categoryIds ?? [],
          description: data.description ?? { en: '', fi: '' },
          details: toLocalizedJson(data.details)
        })
      }
      onUpdate={(id, data) =>
        updateDesign({
          id,
          names: data.names!,
          categoryIds: data.categoryIds ?? [],
          description: data.description ?? { en: '', fi: '' },
          details: toLocalizedJson(data.details)
        })
      }
      onDelete={(id) => deleteDesign(id)}
    />
  )
}
