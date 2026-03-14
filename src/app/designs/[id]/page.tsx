'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { SingleDesignView } from '@/components/views/SingleDesignView'

type Props = {
  params: Promise<{ id: string }>
}

export default function DesignPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const t = useTranslations('common')
  const { state } = useAppState()

  const design = state.designs.find((d) => d.id === id)

  if (!design) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">Design not found.</p>
        <button
          className="mt-4 rounded-lg px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          onClick={() => router.back()}
        >
          {t('goBack')}
        </button>
      </main>
    )
  }

  const pieces = state.pieces.filter((p) => p.designId === id)

  return <SingleDesignView entity={design} pieces={pieces} />
}
