'use client'

import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { useDesignActions } from '@/services/graphql-client/hooks/useDesignActions'
import { toLocalizedJson } from './designFormUtils'
import { EntitiesPage } from '@/components/entities-page/EntitiesPage'

export default function DesignsPage() {
  const t = useTranslations('pages.designs')
  const { state } = useAppState()
  const { createDesign, updateDesign, deleteDesign } = useDesignActions()

  return (
    <EntitiesPage
      title={t('title')}
      label={t('label')}
      description={t('description')}
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
