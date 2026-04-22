import { TaskBoard } from "../components/dashboard/TaskBoard"
import { TeamMembers } from "../components/dashboard/TeamMembers"
import { StatsCards } from "../components/dashboard/StatsCards"
import { ActivityPanel } from "../components/dashboard/ActivityPanel"
import { useAuth } from "../context/AuthContext"

function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(" ")[0] || "there"

  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {"Here's what's happening with your team projects today."}
        </p>
      </div>

      <div className="mb-8">
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TaskBoard />
        </div>

        <div className="space-y-6">
          <TeamMembers editable = {false} />
          <ActivityPanel />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
