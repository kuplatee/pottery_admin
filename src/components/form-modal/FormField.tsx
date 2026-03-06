import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
}

export function FormField({ id, label, registration, error }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type="text"
        {...registration}
        className="mt-1 w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  )
}
