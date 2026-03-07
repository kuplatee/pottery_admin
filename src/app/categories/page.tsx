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
      fieldConfig={{ names: true }}
      entities={state.categories}
      onCreate={(data) => createCategory({ names: data.names! })}
      onUpdate={(id, data) => updateCategory({ id, names: data.names! })}
      onDelete={(id) => deleteCategory(id)}
    />
  )
}
