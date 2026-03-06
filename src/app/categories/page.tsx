'use client'

import { useAppState } from '@/state/AppStateContext'
import { EntitiesPage } from '@/components/entity-components/EntitiesPage'
import { useCreateCategory } from '@/services/graphql-client/hooks/useCreateCategory'

export default function CategoriesPage() {
  const { state } = useAppState()
  const { createCategory } = useCreateCategory()

  return (
    <EntitiesPage
      title="Categories"
      label="Category"
      description="Manage pottery categories"
      entities={state.categories}
      onCreate={(names) => createCategory({ names })}
    />
  )
}
