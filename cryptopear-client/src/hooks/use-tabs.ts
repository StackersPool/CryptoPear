import { useIsomorphicLayoutEffect } from "framer-motion"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

export function useTabs<T extends string>(tabs: readonly T[], initial?: T) {
  const router = useRouter()
  const query = router.query

  const [tab, setTab] = useState<T>(initial ?? tabs[0])

  const goto = useCallback(
    (tab: T) => {
      const url = new URL(router.asPath, "http://placeholder")
      url.searchParams.set("tab", tab)
      return url.pathname + url.search
    },
    [router]
  )

  useIsomorphicLayoutEffect(() => {
    if (!query.tab) return setTab(initial ?? tabs[0])

    if (tab !== query.tab && tabs.some((t) => t === query.tab)) {
      setTab(query.tab as T)
    }
  }, [query, tab, tabs])

  return { tab, goto }
}
