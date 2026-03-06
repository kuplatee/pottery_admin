type NamedEntity = {
  id: string
  names: {
    en: string
    fi: string
  }
}

type Props = {
  entity: NamedEntity
}

export function EntityCard({ entity }: Props) {
  return (
    <li className="rounded border border-gray-200 px-3 py-2">
      <div className="font-medium">{entity.names.fi}</div>
      <div className="text-sm text-gray-400">{entity.names.en}</div>
    </li>
  )
}
