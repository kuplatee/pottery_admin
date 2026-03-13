'use client'

import { useState } from 'react'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { TrashIcon } from './TrashIcon'

type Props = {
  onClick?: () => void
}

export function DeleteButton({ onClick }: Props) {
  const [isConfirming, setIsConfirming] = useState(false)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setIsConfirming(true)
  }

  function handleConfirm() {
    setIsConfirming(false)
    onClick?.()
  }

  function handleCancel() {
    setIsConfirming(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Delete"
        className="rounded p-1 text-gray-400 transition-colors hover:bg-red-500 hover:text-white"
      >
        <TrashIcon />
      </button>
      {isConfirming && <ConfirmDeleteModal onConfirm={handleConfirm} onCancel={handleCancel} />}
    </>
  )
}
