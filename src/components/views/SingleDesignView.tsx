'use client'

import { useTranslations } from 'next-intl'
import type { Design, Piece } from '@/types/graphql-schema-types.generated'
import { DbIdInfo } from '@/components/entity-form-modal/layout/DbIdInfo'
import { LabeledValue } from '@/components/common-primitives/LabeledValue'
import enMessages from '../../../messages/en.json'
import fiMessages from '../../../messages/fi.json'

const PHOTO_BASE_URL = process.env.NEXT_PUBLIC_PHOTO_BASE_URL ?? ''

type Props = {
  entity: Design
  pieces: Piece[]
}

export function SingleDesignView({ entity, pieces }: Props) {
  const t = useTranslations('singleDesign')
  const tPages = useTranslations('pages.designs')
  const tForm = useTranslations('entityForm')

  const en = {
    name: enMessages.singleDesign.name,
    description: enMessages.entityForm.description
  }
  const fi = {
    name: fiMessages.singleDesign.name,
    description: fiMessages.entityForm.description
  }

  return (
    <main className="p-8">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {tPages('label')}
          </h1>
          <DbIdInfo id={entity.id} />
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <div className="space-y-4 pr-8">
            <div className="mt-4 space-y-4">
              <LabeledValue label={en.name} value={entity.names.en} />
              <LabeledValue
                label={en.description}
                value={entity.description.en}
              />
            </div>
          </div>

          <div className="space-y-4 pl-8">
            <div className="mt-4 space-y-4">
              <LabeledValue label={fi.name} value={entity.names.fi} />
              <LabeledValue
                label={fi.description}
                value={entity.description.fi}
              />
            </div>
          </div>
        </div>

        {pieces.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {t('pieces', { count: pieces.length })}
            </p>
            <ul className="flex flex-wrap gap-3">
              {pieces.map((piece) => {
                const imageUrl = piece.imageFileNames[0]
                  ? `${PHOTO_BASE_URL}${piece.imageFileNames[0]}`
                  : null

                return (
                  <li
                    key={piece.id}
                    className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={piece.id}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        {t('noImage')}
                      </div>
                    )}
                    {piece.sold && (
                      <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                        {tForm('sold')}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
