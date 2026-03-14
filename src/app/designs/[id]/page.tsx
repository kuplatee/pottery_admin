'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useAppState } from '@/state/AppStateContext'
import { SingleDesignView } from '@/components/views/SingleDesignView'

type Props = {
  params: Promise<{ id: string }>
}

export default function DesignPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const { state } = useAppState()

  const design = state.designs.find((d) => d.id === id)

  if (!design) {
    return (
      <main className="p-8">
        <p className="text-sm text-gray-500">Design not found.</p>
        <button
          className="mt-4 text-sm text-blue-600 hover:underline"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </main>
    )
  }

  const pieces = state.pieces.filter((p) => p.designId === id)

  return <SingleDesignView entity={design} pieces={pieces} />
}
