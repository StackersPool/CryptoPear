import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { ReactNode } from "react"
import { Alert, AlertType } from "./Alert"

type Props = {
  children: ReactNode
  type?: AlertType
  control: { close: () => void; visible: boolean }
  className?: string
}

export function Toast({ children, type, control, className }: Props) {
  if (!control.visible) return null

  return (
    <Alert type={type} className={clsx("flex items-center justify-between", className)}>
      <div>{children}</div>
      <button onClick={control.close} className="p-1">
        <XMarkIcon className="h-4 w-4" />
      </button>
    </Alert>
  )
}
