import { useState, useEffect } from "react"
import { TaskBoard } from "../components/dashboard/TaskBoard"
import { StatsCards } from "../components/dashboard/StatsCards"
import { useAuth } from "../context/AuthContext"
import { dashboardAPI } from "../lib/api"
import { Loader2 } from "lucide-react"

function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(" ")[0] || "there"

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const res = await dashboardAPI.getMe()
        setDashboardData(res.data)
      } catch (err) {
        console.error("Failed to load dashboard:", err)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <main className="flex items-center justify-center p-6" style={{ minHeight: "60vh" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard…</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex items-center justify-center p-6" style={{ minHeight: "60vh" }}>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  const { profile, stats } = dashboardData || {}

  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {"Here's what's happening with your projects today."}
        </p>
      </div>

      <div className="mb-8">
        <StatsCards stats={stats} profile={profile} />
      </div>

      <TaskBoard editable={false} />
    </main>
  )
}

export default DashboardPage
