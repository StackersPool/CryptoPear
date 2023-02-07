import { Spinner } from "@/components/icons/Spinner"
import { Redirect } from "@/middlewares/Redirect"
import { useUserData } from "@/stacks/auth"
import Head from "next/head"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  title?: string
  description?: string
}

export function AuthLayout({ children, title, description }: Props) {
  const user = useUserData()

  return (
    <>
      <Head>
        <title>{title ?? "Cryptopear"}</title>
        <meta
          name="description"
          content={
            description ??
            "Cryptopear - Decentralized peer-to-peer transactions of assets and services using the PearCoin cryptocurrency"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen items-center justify-center">
        {user.isLoading ? (
          <Spinner className="h-10 w-10 text-blue-600" />
        ) : user.isSuccess ? (
          <Redirect to="/dashboard" />
        ) : (
          children
        )}
      </main>
    </>
  )
}
