'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NamesFields } from './NamesFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nameFi: z.string().min(1, 'Required'),
  nameEn: z.string().min(1, 'Required'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  label: string
  onClose: () => void
}

function handleCreate(label: string, id: string, values: FormValues): void {
  console.log(`TODO: create ${label}`, { id, ...values })
}

export function CreateEntityModal({ label, onClose }: Props) {
  const [id] = useState(() => crypto.randomUUID())

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(values: FormValues) {
    handleCreate(label, id, values)
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
        aria-labelledby="create-entity-title"
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 id="create-entity-title" className="text-lg font-semibold">
            New {label}
          </h2>
          <p className="mt-1 mb-4 text-xs text-gray-400"><span className="font-medium">DB ID:</span> {id}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <NamesFields
              fiRegistration={register('nameFi')}
              enRegistration={register('nameEn')}
              fiError={errors.nameFi}
              enError={errors.nameEn}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
