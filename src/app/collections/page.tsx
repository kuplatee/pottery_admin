'use client'

import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client/react'
import { useCollectionActions } from '@/services/graphql-client/hooks/useCollectionActions'
import {
  GetAllCollectionsDocument,
  GetAllCollectionsQuery
} from '@/services/graphql-client/graphql-queries/collections.generated'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function CollectionsPage() {
  const t = useTranslations('pages.collections')
  const { data } = useQuery<GetAllCollectionsQuery>(GetAllCollectionsDocument)
  const { create, update, remove } = useCollectionActions()

  const collections = data?.collections ?? []

  return (
    <EntitiesView
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{ names: true, description: true }}
      entities={collections}
      onCreate={(data) => create({ names: data.names!, description: data.description! })}
      onUpdate={(id, data) => update({ id, names: data.names!, description: data.description! })}
      onDelete={(id) => remove(id)}
    />
  )
}
