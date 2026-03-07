'use client'

import { useForm } from 'react-hook-form'
import { NamesFields } from './NamesFields'
import { ModalActions } from './ModalActions'
import { DbId } from './DbId'
import { ModalHeader } from './ModalHeader'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nameFi: z.string().min(1, 'Required'),
  nameEn: z.string().min(1, 'Required')
})

type FormValues = z.infer<typeof schema>

type NamedEntity = {
  id: string
  names: { en: string; fi: string }
}

type Props = {
  label: string
  entity?: NamedEntity
  onClose: () => void
  onCreate?: (names: { en: string; fi: string }) => Promise<void>
  onUpdate?: (id: string, names: { en: string; fi: string }) => Promise<void>
  onDelete?: () => void
}

export function EntityModal({ label, entity, onClose, onCreate, onUpdate, onDelete }: Props) {
  const isEditing = entity !== undefined
  const id = entity?.id

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEditing
      ? { nameFi: entity.names.fi, nameEn: entity.names.en }
      : undefined
  })

  async function onSubmit(values: FormValues) {
    if (isEditing && id && onUpdate) {
      await onUpdate(id, { en: values.nameEn, fi: values.nameFi })
    } else if (onCreate) {
      await onCreate({ en: values.nameEn, fi: values.nameFi })
    }
    onClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="entity-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <ModalHeader title={isEditing ? `Edit ${label}` : `New ${label}`} onClose={onClose} />
          <DbId id={id} />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <NamesFields
              fiRegistration={register('nameFi')}
              enRegistration={register('nameEn')}
              fiError={errors.nameFi}
              enError={errors.nameEn}
            />
            <ModalActions isEditing={isEditing} onDelete={onDelete} />
          </form>
        </div>
      </div>
    </>
  )
}
