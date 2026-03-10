'use client'

import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { useCollectionActions } from '@/services/graphql-client/hooks/useCollectionActions'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function CollectionsPage() {
  const t = useTranslations('pages.collections')
  const { state } = useAppState()
  const { createCollection, updateCollection, deleteCollection } =
    useCollectionActions()

  return (
    <EntitiesView
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{ names: true, description: true }}
      entities={state.collections}
      onCreate={(data) =>
        createCollection({ names: data.names!, description: data.description! })
      }
      onUpdate={(id, data) =>
        updateCollection({
          id,
          names: data.names!,
          description: data.description!
        })
      }
      onDelete={(id) => deleteCollection(id)}
    />
  )
}
