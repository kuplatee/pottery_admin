'use client'

import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { useCategoryActions } from '@/services/graphql-client/hooks/useCategoryActions'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function CategoriesPage() {
  const t = useTranslations('pages.categories')
  const { state } = useAppState()
  const { createCategory, updateCategory, deleteCategory } =
    useCategoryActions()

  return (
    <EntitiesView
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
