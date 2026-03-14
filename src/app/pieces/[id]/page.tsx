'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { SinglePieceView } from '@/components/views/SinglePieceView'

type Props = {
  params: Promise<{ id: string }>
}

export default function PiecePage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const t = useTranslations('common')
  const { state } = useAppState()

  const piece = state.pieces.find((p) => p.id === id)

  if (!piece) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">Piece not found.</p>
        <button
          className="mt-4 rounded-lg px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          onClick={() => router.back()}
        >
          {t('goBack')}
        </button>
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
