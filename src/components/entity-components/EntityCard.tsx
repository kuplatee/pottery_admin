import { SUPPORTED_LANGUAGES, type Language } from '@/lib/languages'

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
            <div key={lang} className={i === 0 ? 'font-medium' : 'text-sm text-gray-400'}>
              {entity.names[lang]}
            </div>
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete?.() }}
          className="ml-4 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          aria-label="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </li>
  )
}
