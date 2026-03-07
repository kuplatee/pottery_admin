type Props = {
  title: string
  onClose: () => void
}

export function ModalHeader({ title, onClose }: Props) {
  return (
    <div className="flex items-start justify-between">
      <h2 id="entity-modal-title" className="text-lg font-semibold">
        {title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        className="ml-4 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}
