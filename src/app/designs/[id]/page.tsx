'use client'

import { use } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client/react'
import { GoBackButton } from '@/components/common-primitives/GoBackButton'
import { SingleDesignView } from '@/components/views/SingleDesignView'
import {
  GetAllDesignsDocument,
  GetAllDesignsQuery
} from '@/services/graphql-client/graphql-queries/designs.generated'
import {
  GetAllPiecesDocument,
  GetAllPiecesQuery
} from '@/services/graphql-client/graphql-queries/pieces.generated'

type Props = {
  params: Promise<{ id: string }>
}

export default function DesignPage({ params }: Props) {
  const { id } = use(params)
  const t = useTranslations('pages.designs')
  const { data: designsData } = useQuery<GetAllDesignsQuery>(GetAllDesignsDocument)
  const { data: piecesData } = useQuery<GetAllPiecesQuery>(GetAllPiecesDocument)

  const design = designsData?.designs.find((d) => d.id === id)
  const pieces = piecesData?.pieces.filter((p) => p.designId === id) ?? []

  if (designsData && !design) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">{t('notFound')}</p>
        <GoBackButton />
      </main>
    )
  }

  if (!design) {
    return null
  }

  return <SingleDesignView entity={design} pieces={pieces} />
}
