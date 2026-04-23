import { Card } from "../ui/card"
import {
  CheckCircle,
  Clock,
  Users,
  FolderOpen,
} from "lucide-react"
import { cn } from "../../lib/utils"

export function StatsCards({ stats, profile }) {
  const statItems = [
    {
      id: "1",
      label: "Projects Created",
      value: String(stats?.totalCreated ?? 0),
      icon: FolderOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "2",
      label: "Join Requests",
      value: String(stats?.totalJoinRequests ?? 0),
      icon: Clock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      id: "3",
      label: "Pending Requests",
      value: String(stats?.pendingRequests ?? 0),
      icon: CheckCircle,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      id: "4",
      label: "Skills",
      value: String(profile?.skills?.length ?? 0),
      icon: Users,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.id}
            className="border-border bg-card p-5 hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  stat.bgColor
                )}
              >
                <Icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}