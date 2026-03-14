'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Category, Collection, Design, Piece } from '@/types/graphql-schema-types.generated'
import { DbIdInfo } from '@/components/entity-form-modal/layout/DbIdInfo'
import { LabeledValue } from '@/components/common-primitives/LabeledValue'
import enMessages from '../../../messages/en.json'
import fiMessages from '../../../messages/fi.json'

const PHOTO_BASE_URL = process.env.NEXT_PUBLIC_PHOTO_BASE_URL ?? ''

type Props = {
  entity: Piece
  design: Design | undefined
  collection: Collection | undefined
  categories: Category[]
}

export function SinglePieceView({ entity, design, collection, categories }: Props) {
  const router = useRouter()
  const t = useTranslations('singlePiece')
  const tPages = useTranslations('pages.pieces')
  const tForm = useTranslations('entityForm')

  const en = {
    design: enMessages.entityForm.design,
    collection: enMessages.singlePiece.collection,
    categories: enMessages.entityForm.categories,
    noCollection: enMessages.singlePiece.noCollection,
    noImage: enMessages.singlePiece.noImage,
  }
  const fi = {
    design: fiMessages.entityForm.design,
    collection: fiMessages.singlePiece.collection,
    categories: fiMessages.entityForm.categories,
    noCollection: fiMessages.singlePiece.noCollection,
    noImage: fiMessages.singlePiece.noImage,
  }

  const imageUrl = entity.imageFileNames[0]
    ? `${PHOTO_BASE_URL}${entity.imageFileNames[0]}`
    : null

  return (
    <main className="p-8">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{tPages('label')}</h1>
          <DbIdInfo id={entity.id} />
        </div>

        <div className="relative h-64 w-64 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={entity.id}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              {t('noImage')}
            </div>
          )}
          {entity.sold && (
            <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
              {tForm('sold')}
            </span>
          )}
        </div>

        <div className="grid grid-cols-[auto_1fr] divide-x divide-gray-200">
          <div className="mt-4 space-y-4 pr-8">
            <LabeledValue label={en.design} value={design?.names.en ?? '—'} onClick={design ? () => router.push(`/designs/${design.id}`) : undefined} />
            <LabeledValue
              label={en.collection}
              value={collection?.names.en ?? en.noCollection}
            />
            {categories.length > 0 && (
              <LabeledValue
                label={en.categories}
                value={categories.map((c) => c.names.en).join(', ')}
              />
            )}
          </div>

          <div className="mt-4 space-y-4 pl-8">
            <LabeledValue label={fi.design} value={design?.names.fi ?? '—'} onClick={design ? () => router.push(`/designs/${design.id}`) : undefined} />
            <LabeledValue
              label={fi.collection}
              value={collection?.names.fi ?? fi.noCollection}
            />
            {categories.length > 0 && (
              <LabeledValue
                label={fi.categories}
                value={categories.map((c) => c.names.fi).join(', ')}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
