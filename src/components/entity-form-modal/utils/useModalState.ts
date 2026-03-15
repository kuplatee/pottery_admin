import { useState } from 'react'

export type ModalState<T> = { type: 'create' } | { type: 'edit'; entity: T } | null

export function useModalState<T>() {
  const [modal, setModal] = useState<ModalState<T>>(null)

  function openCreate() {
    setModal({ type: 'create' })
  }

  function openEdit(entity: T) {
    setModal({ type: 'edit', entity })
  }

  function close() {
    setModal(null)
  }

  return { modal, openCreate, openEdit, close }
}
