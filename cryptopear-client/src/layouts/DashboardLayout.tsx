import { Spinner } from "@/components/icons/Spinner"
import { Redirect } from "@/middlewares/Redirect"
import { useDisconnect, useUserData } from "@/stacks/auth"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  title?: string
  description?: string
}

export function DashboardLayout({ children, title, description }: Props) {
  const user = useUserData()
  const disconnect = useDisconnect()
  const router = useRouter()

  const doDisconnect = () => {
    disconnect.mutate(undefined, {
      onSuccess() {
        router.push("/")
      },
    })
  }

  if (user.isLoading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Spinner className="h-10 w-10 text-blue-600" />
      </main>
    )

  if (user.isError) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Head>
        <title>{title ?? "Cryptopear Client"}</title>
        <meta
          name="description"
          content={
            description ??
            "Cryptopear Client - Decentralized peer-to-peer transactions of assets and services using the PearCoin cryptocurrency"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <header className="flex items-center justify-between border-b px-4 md:px-8">
          <Link href="/" className="py-4 text-xl font-bold">
            Cryptopear
          </Link>

          <div className="">
            <button
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white"
              onClick={doDisconnect}
            >
              Disconnect
            </button>
          </div>
        </header>
        <main className="px-4 py-4 md:px-8 md:py-8">{children}</main>
      </div>
    </>
  )
}
