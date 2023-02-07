import { useRouter } from "next/router"
import { useEffect } from "react"

type Props = {
  to: string
}

export function Redirect({ to }: Props) {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [])

  return null
}
