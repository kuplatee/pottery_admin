import type { DocumentNode } from '@apollo/client'
import { useTranslations } from 'next-intl'
import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'
import { useAppState } from '@/state/AppStateContext'
import { withToast } from '@/services/toast/withToast'
import type { AppStateAction } from '@/state/types'

interface EntityActionsConfig<TEntity, TCreateMutation, TUpdateMutation> {
  namespace: string
  documents: {
    create: DocumentNode
    update: DocumentNode
    delete: DocumentNode
  }
  extract: {
    create: (data: TCreateMutation) => TEntity
    update: (data: TUpdateMutation) => TEntity
  }
  toAction: {
    add: (entity: TEntity) => AppStateAction
    update: (entity: TEntity) => AppStateAction
    remove: (id: string) => AppStateAction
  }
}

export function createEntityActions<
  TEntity,
  TCreateInput,
  TUpdateInput,
  TCreateMutation,
  TUpdateMutation
>(config: EntityActionsConfig<TEntity, TCreateMutation, TUpdateMutation>) {
  return function useEntityActions() {
    const client = useApiClient()
    const { dispatch } = useAppState()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tPage = useTranslations(config.namespace as any) as (key: string) => string
    const tActions = useTranslations('actions')
    const label = tPage('label')

    async function create(input: TCreateInput): Promise<void> {
      await withToast(
        async () => {
          const result = await client.mutate<TCreateMutation>({
            mutation: config.documents.create,
            variables: { input }
          })
          if (result.data) {
            dispatch(config.toAction.add(config.extract.create(result.data)))
          }
        },
        {
          success: tActions('createSuccess', { label }),
          error: tActions('createError', { label })
        }
      )
    }

    async function update(input: TUpdateInput): Promise<void> {
      await withToast(
        async () => {
          const result = await client.mutate<TUpdateMutation>({
            mutation: config.documents.update,
            variables: { input }
          })
          if (result.data) {
            dispatch(config.toAction.update(config.extract.update(result.data)))
          }
        },
        {
          success: tActions('updateSuccess', { label }),
          error: tActions('updateError', { label })
        }
      )
    }

    async function remove(id: string): Promise<void> {
      await withToast(
        async () => {
          await client.mutate({
            mutation: config.documents.delete,
            variables: { id }
          })
          dispatch(config.toAction.remove(id))
        },
        { error: tActions('deleteError', { label }) }
      )
    }

    return { create, update, remove }
  }
}
