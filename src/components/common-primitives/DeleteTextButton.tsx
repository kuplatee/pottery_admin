'use client'

import { useTranslations } from 'next-intl'

type Props = {
  onClick: () => void
}

export function DeleteTextButton({ onClick }: Props) {
  const t = useTranslations('common')

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded px-4 py-2 text-sm text-gray-400 hover:text-red-500 hover:bg-red-50"
    >
      {t('delete')}
    </button>
  )
}
