'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { useDesignActions } from '@/services/graphql-client/hooks/useDesignActions'
import { toLocalizedJson } from './designFormUtils'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'
import type { LocalizedString } from '@/app/api/graphql/graphql-server/services/common/types'
import { EntitiesView } from '@/components/views/EntitiesView'

export default function DesignsPage() {
  const t = useTranslations('pages.designs')
  const router = useRouter()
  const { state } = useAppState()
  const { createDesign, updateDesign, deleteDesign } = useDesignActions()

  const pieceCountsByDesignId = state.pieces.reduce<Record<string, number>>((acc, piece) => {
    acc[piece.designId] = (acc[piece.designId] ?? 0) + 1
    return acc
  }, {})

  return (
    <EntitiesView
      title={t('title')}
      label={t('label')}
      description={t('description')}
      fieldConfig={{
        names: true,
        description: true,
        details: true,
        categoryIds: true
      }}
      entities={state.designs}
      entityPieceCounts={pieceCountsByDesignId}
      onEntityClick={(id) => router.push(`/designs/${id}`)}
      availableCategories={state.categories}
      onCreate={(data) =>
        createDesign({
          names: data.names!,
          categoryIds: data.categoryIds ?? [],
          description: data.description ?? (Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, ''])) as LocalizedString),
          details: toLocalizedJson(data.details)
        })
      }
      onUpdate={(id, data) =>
        updateDesign({
          id,
          names: data.names!,
          categoryIds: data.categoryIds ?? [],
          description: data.description ?? (Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, ''])) as LocalizedString),
          details: toLocalizedJson(data.details)
        })
      }
      onDelete={(id) => deleteDesign(id)}
    />
  )
}
