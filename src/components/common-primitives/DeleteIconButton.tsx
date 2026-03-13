import { TrashIcon } from './TrashIcon'

type Props = {
  onClick?: () => void
}

export function DeleteButton({ onClick }: Props) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onClick?.()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Delete"
      className="rounded p-1 text-gray-400 transition-colors hover:bg-red-500 hover:text-white"
    >
      <TrashIcon />
    </button>
  )
}
