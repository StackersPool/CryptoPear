import { Spinner } from "@/components/icons/Spinner"
import { Modal } from "@/components/ui/Modal"
import { Confirm } from "@/containers/Dialogs"
import { useModal } from "@/hooks/use-modal"
import { Redirect } from "@/middlewares/Redirect"
import { useDisconnect, useUserData } from "@/stacks/auth"
import { Menu } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
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

  const [disconnectPrompt, disconnectControls] = useModal()

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

      <div className="">
        <header className="flex items-center justify-between border-b px-4 md:px-8">
          <Link href="/" className="py-4 text-xl font-bold">
            Cryptopear
          </Link>

          <div className="flex items-center gap-x-4">
            <Menu as="div" className="relative flex items-center">
              <Menu.Button>
                {({ open }) => (open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />)}
              </Menu.Button>

              <Menu.Items
                as="ul"
                className="absolute right-0 top-full z-10 w-56 translate-y-2 overflow-hidden rounded-lg border border-gray-50 bg-white text-sm text-black shadow-xl outline-none"
              >
                <li className="block w-full overflow-hidden text-ellipsis px-3 py-2 text-xs text-zinc-500">
                  <span className="break-words">{user.data?.identityAddress}</span>
                </li>
                <Menu.Item as="li">
                  {({ active }) => (
                    <Link
                      className={clsx("block px-3 py-3", active && "bg-blue-600/5 text-blue-600")}
                      href="/dashboard"
                    >
                      Trades
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item as="li">
                  {({ active }) => (
                    <Link
                      className={clsx("block px-3 py-3", active && "bg-blue-600/5 text-blue-600")}
                      href="/dashboard"
                    >
                      Invest
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item as="li">
                  {({ active }) => (
                    <Link
                      className={clsx("block px-3 py-3", active && "bg-blue-600/5 text-blue-600")}
                      href="/dashboard"
                    >
                      Manage
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item as="li">
                  {({ active }) => (
                    <button
                      className={clsx(
                        "w-full px-3 py-3 text-start text-red-400",
                        active && "bg-red-400/5 text-red-500"
                      )}
                      onClick={disconnectPrompt}
                    >
                      Disconnect
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <button
              className="hidden rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600/80 lg:block"
              onClick={disconnectPrompt}
            >
              Disconnect
            </button>
          </div>
        </header>
        <main className="px-4 py-4 md:px-8 md:py-8">{children}</main>
      </div>

      <Modal {...disconnectControls}>
        <Confirm
          title="Are you sure you want to disconnect?"
          desc="This will log you out of the application."
          onCancel={disconnectControls.onClose}
          onConfirm={doDisconnect}
        />
      </Modal>
    </>
  )
}
