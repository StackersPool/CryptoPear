import { useCallback, useMemo, useState } from "react"

export type ModalControls = {
  isOpen: boolean
  onClose: () => void
  backdropClose?: boolean
}

export function useModal(backdropClose = true): [() => void, ModalControls] {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const controls = useMemo(
    () => ({
      isOpen,
      onClose: toggle,
      backdropClose,
    }),
    [isOpen, toggle, backdropClose]
  )

  return [toggle, controls]
}
