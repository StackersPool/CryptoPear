import { useCallback, useState } from "react"
import { useModal } from "./use-modal"

export function useDetail<T>() {
  const [toggle, controls] = useModal()

  const [data, setData] = useState<T>()

  const view = useCallback(
    (data: T) => {
      setData(data)
      toggle()
    },
    [toggle]
  )

  return [data, view, controls] as const
}
