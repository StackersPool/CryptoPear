import clsx from "clsx"
import { ReactNode } from "react"

export type AlertType = "success" | "warning" | "error" | "primary"

type Props = {
  type?: AlertType
  children: ReactNode
  className?: string
}

export function Alert({ type = "primary", children, className }: Props) {
  return (
    <div
      className={clsx([
        "rounded-lg border px-3 py-2 text-xs sm:text-sm",
        type === "primary" && "border-blue-600/90 bg-blue-600/5 text-blue-600/90",
        type === "success" && "border-emerald-700 bg-emerald-100/60 text-emerald-700",
        type === "warning" && "border-yellow-700 bg-yellow-100/60 text-yellow-700",
        type === "error" && "border-red-700 bg-red-100/60 text-red-700",
        className,
      ])}
    >
      {children}
    </div>
  )
}
