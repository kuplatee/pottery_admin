'use client'

import { use } from 'react'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/state/AppStateContext'
import { GoBackButton } from '@/components/common-primitives/GoBackButton'
import { SingleDesignView } from '@/components/views/SingleDesignView'

type Props = {
  params: Promise<{ id: string }>
}

export default function DesignPage({ params }: Props) {
  const { id } = use(params)
  const t = useTranslations('pages.designs')
  const { state } = useAppState()

  const design = state.designs.find((d) => d.id === id)

  if (!design) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">{t('notFound')}</p>
        <GoBackButton />
      </main>
    )
  }

  const pieces = state.pieces.filter((p) => p.designId === id)

  return <SingleDesignView entity={design} pieces={pieces} />
}
