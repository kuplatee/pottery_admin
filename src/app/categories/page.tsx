'use client'

import { useAppState } from '@/state/AppStateContext'
import { EntitiesPage } from '@/components/entity-components/EntitiesPage'
import { useCategoryActions } from '@/services/graphql-client/hooks/useCategoryActions'

export default function CategoriesPage() {
  const { state } = useAppState()
  const { createCategory, updateCategory, deleteCategory } =
    useCategoryActions()

  return (
    <EntitiesPage
      title="Categories"
      label="Category"
      description="Manage pottery categories"
      entities={state.categories}
      onCreate={(names) => createCategory({ names })}
      onUpdate={(id, names) => updateCategory({ id, names })}
      onDelete={(id) => deleteCategory(id)}
    />
  )
}
