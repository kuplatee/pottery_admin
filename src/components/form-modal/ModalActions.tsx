type Props = {
  isEditing: boolean
  onClose: () => void
}

export function ModalActions({ isEditing, onClose }: Props) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        {isEditing ? 'Save' : 'Create'}
      </button>
    </div>
  )
}
