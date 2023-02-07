import { AuthLayout } from "@/layouts/AuthLayout"
import { useConnect } from "@/stacks/auth"
import { useRouter } from "next/router"

export default function Home() {
  const connect = useConnect()
  const router = useRouter()

  const doConnect = () => {
    connect.mutate(undefined, {
      onSuccess() {
        router.push("/dashboard")
      },
    })
  }

  return (
    <AuthLayout>
      <div className="flex max-w-md flex-col items-center gap-y-4">
        <p className="text-xl font-bold">Welcome to Cryptopear</p>
        <p className="text-center">
          Decentralized peer-to-peer transactions of assets and services using the PearCoin cryptocurrency
        </p>

        <button
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600/80"
          onClick={doConnect}
        >
          Connect
        </button>
      </div>
    </AuthLayout>
  )
}
