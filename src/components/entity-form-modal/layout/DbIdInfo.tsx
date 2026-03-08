'use client'

import { useTranslations } from 'next-intl'

type Props = {
  id?: string
}

export function DbIdInfo({ id }: Props) {
  const t = useTranslations('entityForm')

  if (!id) {
    return null
  }

  return (
    <p className="mt-1 mb-4 text-xs text-gray-400">
      <span className="font-medium">{t('dbId')}:</span> {id}
    </p>
  )
}
