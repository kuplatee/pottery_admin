type Props = {
  id?: string
}

export function DbIdInfo({ id }: Props) {
  if (!id) {
    return null
  }
  return (
    <p className="mt-1 mb-4 text-xs text-gray-400">
      <span className="font-medium">DB ID:</span> {id}
    </p>
  )
}
