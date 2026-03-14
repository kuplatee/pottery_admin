type Props = {
  label: string
  value: string
}

export function LabeledValue({ label, value }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm text-gray-800">{value}</p>
    </div>
  )
}
