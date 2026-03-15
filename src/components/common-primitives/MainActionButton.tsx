type Props = {
  label: string
  disabled?: boolean
}

export function MainActionButton({ label, disabled }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  )
}
