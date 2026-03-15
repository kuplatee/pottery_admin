'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

type Props = {
  onClick: () => void
}

export function DeleteTextButton({ onClick }: Props) {
  const t = useTranslations('common')
  const [isConfirming, setIsConfirming] = useState(false)

  function handleConfirm() {
    setIsConfirming(false)
    onClick()
  }

  function handleCancel() {
    setIsConfirming(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="rounded px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-red-500 hover:text-white"
      >
        {t('delete')}
      </button>
      {isConfirming && (
        <ConfirmDeleteModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </>
  )
}
