import { TaskBoard } from "../components/dashboard/TaskBoard"
import { TeamMembers } from "../components/dashboard/TeamMembers"
import { StatsCards } from "../components/dashboard/StatsCards"
import { ActivityPanel } from "../components/dashboard/ActivityPanel"

function DashboardPage() {
  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, John
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
          <TeamMembers />
          <ActivityPanel />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage