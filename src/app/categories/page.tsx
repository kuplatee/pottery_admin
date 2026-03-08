'use client'

import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { useCategoryActions } from '@/services/graphql-client/hooks/useCategoryActions'
import { EntitiesPage } from '@/components/entities-page/EntitiesPage'

export default function CategoriesPage() {
  const t = useTranslations('pages.categories')
  const { state } = useAppState()
  const { createCategory, updateCategory, deleteCategory } =
    useCategoryActions()

  return (
    <EntitiesPage
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{ names: true }}
      entities={state.categories}
      onCreate={(data) => createCategory({ names: data.names! })}
      onUpdate={(id, data) => updateCategory({ id, names: data.names! })}
      onDelete={(id) => deleteCategory(id)}
    />
  )
}
