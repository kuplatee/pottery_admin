import { useTranslations } from 'next-intl'
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
  pieceCount?: number
}

export function EntityCard({ entity, onClick, onDelete, pieceCount }: Props) {
  const t = useTranslations('entityForm')

  return (
    <li
      className="cursor-pointer rounded border border-gray-200 px-3 py-1.5 transition-colors hover:bg-gray-100"
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
          {pieceCount !== undefined && (
            <div className="text-[10px] font-bold text-gray-400">
              {t('pieceCount')} {pieceCount}
            </div>
          )}
        </div>
        <DeleteButton onClick={onDelete} />
      </div>
    </li>
  )
}
