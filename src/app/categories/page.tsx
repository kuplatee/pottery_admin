'use client'

import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client/react'
import { useCategoryActions } from '@/services/graphql-client/hooks/useCategoryActions'
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery
} from '@/services/graphql-client/graphql-queries/categories.generated'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function CategoriesPage() {
  const t = useTranslations('pages.categories')
  const { data } = useQuery<GetAllCategoriesQuery>(GetAllCategoriesDocument)
  const { create, update, remove } = useCategoryActions()

  const categories = data?.categories ?? []

  return (
    <EntitiesView
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{ names: true }}
      entities={categories}
      onCreate={(data) => create({ names: data.names! })}
      onUpdate={(id, data) => update({ id, names: data.names! })}
      onDelete={(id) => remove(id)}
    />
  )
}
