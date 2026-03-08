import { DeleteTextButton } from '@/components/common-primitives/DeleteTextButton'

type Props = {
  isEditing: boolean
  onDelete?: () => void
}

export function ModalActions({ isEditing, onDelete }: Props) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      {isEditing && onDelete && <DeleteTextButton onClick={onDelete} />}
      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        {isEditing ? 'Save' : 'Create'}
      </button>
    </div>
  )
}
