'use client'

import { useForm } from 'react-hook-form'
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

function handleCreate(label: string, values: FormValues): void {
  console.log(`TODO: create ${label}`, values)
}

export function CreateEntityModal({ label, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(values: FormValues) {
    handleCreate(label, values)
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="nameFi"
                className="block text-sm font-medium text-gray-700"
              >
                Name (Finnish)
              </label>
              <input
                id="nameFi"
                type="text"
                {...register('nameFi')}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.nameFi && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.nameFi.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="nameEn"
                className="block text-sm font-medium text-gray-700"
              >
                Name (English)
              </label>
              <input
                id="nameEn"
                type="text"
                {...register('nameEn')}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.nameEn && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.nameEn.message}
                </p>
              )}
            </div>
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
