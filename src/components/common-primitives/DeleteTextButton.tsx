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
      className="rounded px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-red-500 hover:text-white"
    >
      {t('delete')}
    </button>
  )
}
