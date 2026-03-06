type NamedEntity = {
  id: string
  names: {
    en: string
    fi: string
  }
}

type Props = {
  entity: NamedEntity
  onClick?: () => void
}

export function EntityCard({ entity, onClick }: Props) {
  return (
    <li
      className="cursor-pointer rounded border border-gray-200 px-3 py-2 transition-colors hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="font-medium">{entity.names.fi}</div>
      <div className="text-sm text-gray-400">{entity.names.en}</div>
    </li>
  )
}
