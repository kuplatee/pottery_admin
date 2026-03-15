import type { DocumentNode } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { withToast } from '@/services/toast/withToast'

// NOTE: mutations use refetchQueries to keep the UI in sync after changes.
// This re-fetches the full entity list on every mutation, which is fine at
// current scale. If any entity type grows large, switch to pagination +
// Apollo cache.modify to avoid fetching unbounded lists on every mutation.
interface EntityActionsConfig {
  namespace: string
  documents: {
    create: DocumentNode
    update: DocumentNode
    delete: DocumentNode
  }
  refetchQueries: DocumentNode[]
}

export function createEntityActions<TCreateInput, TUpdateInput>(
  config: EntityActionsConfig
) {
  return function useEntityActions() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tPage = useTranslations(config.namespace as any) as (key: string) => string
    const tActions = useTranslations('actions')
    const label = tPage('label')

    const [createMutation] = useMutation(config.documents.create, {
      refetchQueries: config.refetchQueries
    })
    const [updateMutation] = useMutation(config.documents.update, {
      refetchQueries: config.refetchQueries
    })
    const [deleteMutation] = useMutation(config.documents.delete, {
      refetchQueries: config.refetchQueries
    })

    async function create(input: TCreateInput): Promise<void> {
      await withToast(
        async () => { await createMutation({ variables: { input } }) },
        { success: tActions('createSuccess', { label }), error: tActions('createError', { label }) }
      )
    }

    async function update(input: TUpdateInput): Promise<void> {
      await withToast(
        async () => { await updateMutation({ variables: { input } }) },
        { success: tActions('updateSuccess', { label }), error: tActions('updateError', { label }) }
      )
    }

    async function remove(id: string): Promise<void> {
      await withToast(
        async () => { await deleteMutation({ variables: { id } }) },
        { success: tActions('deleteSuccess', { label }), error: tActions('deleteError', { label }) }
      )
    }

    return { create, update, remove }
  }
}
