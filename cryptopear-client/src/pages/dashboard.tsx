import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useUserData } from "@/stacks/auth"

export default function Dashboard() {
  const user = useUserData()

  if (!user.data) return null

  return (
    <DashboardLayout>
      <p>Welcome, {user.data.identityAddress}</p>
    </DashboardLayout>
  )
}
