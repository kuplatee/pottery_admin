type Props = {
  label: string
  value: string
  onClick?: () => void
}

export function LabeledValue({ label, value, onClick }: Props) {
  if (onClick) {
    return (
      <button className="-mx-2 rounded-lg px-2 py-1 text-left transition-colors hover:bg-gray-100" onClick={onClick}>
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="mt-0.5 text-sm text-gray-800 underline">{value}</p>
      </button>
    )
  }

  return (
    <div>
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm text-gray-800">{value}</p>
    </div>
  )
}
