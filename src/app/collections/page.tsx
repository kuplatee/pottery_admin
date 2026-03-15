'use client'

import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { useCollectionActions } from '@/services/graphql-client/hooks/useCollectionActions'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function CollectionsPage() {
  const t = useTranslations('pages.collections')
  const { state } = useAppState()
  const { create, update, remove } = useCollectionActions()

  return (
    <EntitiesView
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{ names: true, description: true }}
      entities={state.collections}
      onCreate={(data) =>
        create({ names: data.names!, description: data.description! })
      }
      onUpdate={(id, data) =>
        update({
          id,
          names: data.names!,
          description: data.description!
        })
      }
      onDelete={(id) => remove(id)}
    />
  )
}
