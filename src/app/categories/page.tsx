'use client'

import { useAppState } from '@/state/AppStateContext'
import { EntitiesPage } from '@/components/EntitiesPage'

export default function CategoriesPage() {
  const { state } = useAppState()

  return (
    <EntitiesPage
      title="Categories"
      label="Category"
      description="Manage pottery categories"
      entities={state.categories}
    />
  )
}
