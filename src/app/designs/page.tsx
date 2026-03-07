'use client'

import { useAppState } from '@/state/AppStateContext'
import { EntitiesPage } from '@/components/entity-components/EntitiesPage'
import { useDesignActions } from '@/services/graphql-client/hooks/useDesignActions'
import type { EntityFormData } from '@/components/form-modal/CreateEntityModal'

function toLocalizedJson(details: EntityFormData['details']): { en: Record<string, string>; fi: Record<string, string> } {
  if (!details) { return { en: {}, fi: {} } }
  return details.reduce<{ en: Record<string, string>; fi: Record<string, string> }>(
    (acc, entry) => {
      acc.en[entry.keyEn] = entry.valueEn
      acc.fi[entry.keyFi] = entry.valueFi
      return acc
    },
    { en: {}, fi: {} }
  )
}

export default function DesignsPage() {
  const { state } = useAppState()
  const { createDesign, updateDesign, deleteDesign } = useDesignActions()

  return (
    <EntitiesPage
      title="Designs"
      label="Design"
      description="Manage pottery designs"
      fieldConfig={{ names: true, description: true, details: true }}
      entities={state.designs}
      onCreate={(data) =>
        createDesign({
          names: data.names!,
          categoryIds: [],
          description: data.description ?? { en: '', fi: '' },
          details: toLocalizedJson(data.details)
        })
      }
      onUpdate={(id, data) =>
        updateDesign({
          id,
          names: data.names!,
          categoryIds: [],
          description: data.description ?? { en: '', fi: '' },
          details: toLocalizedJson(data.details)
        })
      }
      onDelete={(id) => deleteDesign(id)}
    />
  )
}
