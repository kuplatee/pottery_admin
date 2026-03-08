type Props = {
  label: string
}

export function MainActionButton({ label }: Props) {
  return (
    <button
      type="submit"
      className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
    >
      {label}
    </button>
  )
}
