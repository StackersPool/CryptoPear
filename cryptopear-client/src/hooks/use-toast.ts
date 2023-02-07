import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export function useToast(duration = 5000) {
  const timer = useRef<NodeJS.Timeout | null>(null)

  const [visible, setVisible] = useState(false)

  const close = useCallback(() => setVisible(false), [])

  const toast = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
    setVisible(true)
    timer.current = setTimeout(close, duration)
  }, [close])

  useEffect(() => {
    if (!visible) return

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [visible, duration, close])

  return useMemo(() => ({ toast, close, visible }), [toast, close, visible])
}
