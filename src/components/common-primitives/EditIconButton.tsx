import { EditIcon } from './EditIcon'

type Props = {
  onClick?: () => void
}

export function EditIconButton({ onClick }: Props) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onClick?.()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Edit"
      className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-800"
    >
      <EditIcon />
    </button>
  )
}
