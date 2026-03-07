type Props = {
  isEditing: boolean
  onDelete?: () => void
}

export function ModalActions({ isEditing, onDelete }: Props) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      {isEditing && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="rounded px-4 py-2 text-sm text-gray-400 hover:text-red-500 hover:bg-red-50"
        >
          Delete
        </button>
      )}
      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        {isEditing ? 'Save' : 'Create'}
      </button>
    </div>
  )
}
