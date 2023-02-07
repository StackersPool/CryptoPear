type Props = {
  title?: string
  desc?: string
  onCancel: () => void
  onConfirm: () => void
}

export function Confirm({ title = "Are you sure you want to continue?", desc, onCancel, onConfirm }: Props) {
  return (
    <div>
      {desc ? (
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          <p className="mt-2">{desc}</p>
        </div>
      ) : (
        <h3 className="text-base">{title}</h3>
      )}

      <div className="mt-4 flex justify-end gap-x-3">
        <button
          onClick={onCancel}
          className="rounded-lg bg-blue-600/5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-600/10"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600/80"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
