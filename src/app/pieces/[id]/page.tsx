'use client'

import { use } from 'react'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { GoBackButton } from '@/components/common-primitives/GoBackButton'
import { SinglePieceView } from '@/components/views/SinglePieceView'

type Props = {
  params: Promise<{ id: string }>
}

export default function PiecePage({ params }: Props) {
  const { id } = use(params)
  const t = useTranslations('pages.pieces')
  const { state } = useAppState()

  const piece = state.pieces.find((p) => p.id === id)

  if (!piece) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">{t('notFound')}</p>
        <GoBackButton />
      </main>
    )
  }

  const design = state.designs.find((d) => d.id === piece.designId)
  const collection = piece.collectionId
    ? state.collections.find((c) => c.id === piece.collectionId)
    : undefined
  const categories = state.categories.filter((c) =>
    design?.categoryIds.includes(c.id)
  )

  return (
    <SinglePieceView
      entity={piece}
      design={design}
      collection={collection}
      categories={categories}
    />
  )
}
