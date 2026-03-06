'use client'

import { useForm } from 'react-hook-form'
import { NamesFields } from './NamesFields'
import { ModalActions } from './ModalActions'
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
}

export function EntityModal({ label, entity, onClose }: Props) {
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

  function onSubmit(values: FormValues) {
    if (isEditing) {
      console.log(`TODO: update ${label}`, { id, ...values })
    } else {
      console.log(`TODO: create ${label}`, { id, ...values })
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
          <h2 id="entity-modal-title" className="text-lg font-semibold">
            {isEditing ? `Edit ${label}` : `New ${label}`}
          </h2>
          {id && (
            <p className="mt-1 mb-4 text-xs text-gray-400">
              <span className="font-medium">DB ID:</span> {id}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <NamesFields
              fiRegistration={register('nameFi')}
              enRegistration={register('nameEn')}
              fiError={errors.nameFi}
              enError={errors.nameEn}
            />
            <ModalActions isEditing={isEditing} onClose={onClose} />
          </form>
        </div>
      </div>
    </>
  )
}
