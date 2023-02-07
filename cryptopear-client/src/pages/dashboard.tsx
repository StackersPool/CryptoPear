import { Modal } from "@/components/ui/Modal"
import { Trade } from "@/containers/Trade"
import { useDetail } from "@/hooks/use-detail"
import { useTabs } from "@/hooks/use-tabs"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useUserData } from "@/stacks/auth"
import { LayoutGroup, motion } from "framer-motion"
import Link from "next/link"

const tabs = [
  { title: "All assets", type: "all" },
  { title: "Recent assets", type: "recent" },
  { title: "Trending assets", type: "trending" },
] as const

export default function Dashboard() {
  const user = useUserData()

  const { tab, goto } = useTabs(tabs.map((t) => t.type))

  if (!user.data) return null

  return (
    <DashboardLayout>
      <h3 className="break-words text-lg">Welcome, {user.data.identityAddress}</h3>

      <section className="mt-8 flex flex-wrap gap-4">
        <button className="rounded-2xl bg-gray-100 px-8 py-4 font-medium hover:bg-gray-200 hover:text-blue-600">
          Trade
        </button>
        <button className="rounded-2xl bg-gray-100 px-8 py-4 font-medium hover:bg-gray-200">Invest</button>
        <button className="rounded-2xl bg-gray-100 px-8 py-4 font-medium hover:bg-gray-200">Manage</button>
      </section>

      <section className="mt-8">
        <ul className="no-scrollbar mx-auto flex items-baseline justify-between overflow-x-scroll px-4 md:max-w-2xl">
          <LayoutGroup id="trades">
            {tabs.map((t) => (
              <li key={t.type} className="shrink-0">
                <Link href={goto(t.type)} className="flex flex-col items-center text-lg font-medium outline-none">
                  <span
                    className={`transition-colors duration-300 ${
                      tab === t.type ? "text-blue-600" : "text-gray-400"
                    } px-4`}
                  >
                    {t.title}
                  </span>
                  {tab === t.type && (
                    <motion.span layoutId="underline" className="mt-1 h-[2px] w-full rounded-full bg-blue-600" />
                  )}
                </Link>
              </li>
            ))}
          </LayoutGroup>
        </ul>

        <div className="pt-8">
          <Trades type={tab} />
        </div>
      </section>
    </DashboardLayout>
  )
}

function Trades({ type }: { type: string }) {
  const [trade, view, controls] = useDetail<string>()

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          onClick={() => view(type)}
          className="rounded-2xl border border-gray-100 bg-gray-100 py-2 px-4 hover:border-gray-200"
        >
          <div className="flex h-52 items-center justify-center text-xl text-gray-400">{type}</div>
        </div>
      ))}

      <Modal {...controls}>{trade && <Trade trade={trade} onClose={controls.onClose} />}</Modal>
    </div>
  )
}
