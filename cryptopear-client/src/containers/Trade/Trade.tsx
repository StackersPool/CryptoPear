import { Alert } from "@/components/ui/Alert"
import { Toast } from "@/components/ui/Toast"
import { useToast } from "@/hooks/use-toast"
import { Trade } from "@/interfaces/trade"

type Props = {
  trade: Trade
  onClose: () => void
}

export function Trade({ trade, onClose }: Props) {
  const action = useToast()

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">Trade {trade}</p>

      <Alert>
        <p>This trade is awaiting confirmation</p>
      </Alert>

      <Toast type="success" control={action}>
        <p>Action was successful</p>
      </Toast>

      <div className="flex justify-end gap-x-3">
        <button
          onClick={onClose}
          className="rounded-lg bg-blue-600/5 px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-600/10"
        >
          Cancel
        </button>

        <button
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600/80"
          onClick={action.toast}
        >
          Trade
        </button>
      </div>
    </div>
  )
}
