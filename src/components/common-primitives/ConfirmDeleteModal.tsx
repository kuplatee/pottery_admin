'use client'

import { useTranslations } from 'next-intl'

type Props = {
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDeleteModal({ onConfirm, onCancel }: Props) {
  const t = useTranslations('common')

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-base font-semibold text-gray-800">{t('confirmDeleteTitle')}</h2>
        <p className="mb-6 text-sm text-gray-500">{t('confirmDeleteMessage')}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  )
}
