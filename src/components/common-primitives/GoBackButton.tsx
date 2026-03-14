'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function GoBackButton() {
  const router = useRouter()
  const t = useTranslations('common')

  return (
    <button
      className="mt-4 rounded-lg px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
      onClick={() => router.back()}
    >
      {t('goBack')}
    </button>
  )
}
