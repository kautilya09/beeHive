import { Card } from "../ui/card"
import {
  CheckCircle,
  Clock,
  Users,
  FolderOpen,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { cn } from "../../lib/utils"

const stats = [
  {
    id: "1",
    label: "Tasks Completed",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: CheckCircle,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "2",
    label: "In Progress",
    value: "8",
    change: "+3%",
    trend: "up",
    icon: Clock,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: "3",
    label: "Team Members",
    value: "6",
    change: "0%",
    trend: "neutral",
    icon: Users,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: "4",
    label: "Files Shared",
    value: "42",
    change: "-5%",
    trend: "down",
    icon: FolderOpen,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
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

              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.trend === "up"
                    ? "text-primary"
                    : stat.trend === "down"
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                {stat.change}
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