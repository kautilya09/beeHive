import { Sidebar } from "../components/dashboard/Sidebar"
import { Header } from "../components/dashboard/Header"
import { TaskBoard } from "../components/dashboard/TaskBoard"
import { TeamMembers } from "../components/dashboard/TeamMembers"
import { StatsCards } from "../components/dashboard/StatsCards"
import { MobileSidebar } from "../components/dashboard/MobileSidebar"
import { ActivityPanel } from "../components/dashboard/ActivityPanel"
function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <div className="relative hidden sm:block">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search tasks, teams, files..."
                className="h-10 w-64 rounded-lg border border-border bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:w-80"
              />
            </div>
          </div>

          <Header />
        </header>

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
      </div>
    </div>
  )
}
export default DashboardPage