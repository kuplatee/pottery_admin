import { SUPPORTED_LANGUAGES, type Language } from '@/lib/languages'
import { DeleteButton } from '@/components/common-primitives/DeleteIconButton'

type NamedEntity = {
  id: string
  names: Record<Language, string>
}

type Props = {
  entity: NamedEntity
  onClick?: () => void
  onDelete?: () => void
}

export function EntityCard({ entity, onClick, onDelete }: Props) {
  return (
    <li
      className="cursor-pointer rounded border border-gray-200 px-3 py-2 transition-colors hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          {SUPPORTED_LANGUAGES.map((lang, i) => (
            <div
              key={lang}
              className={i === 0 ? 'font-medium' : 'text-sm text-gray-400'}
            >
              {entity.names[lang]}
            </div>
          ))}
        </div>
        <DeleteButton onClick={onDelete} />
      </div>
    </li>
  )
}
