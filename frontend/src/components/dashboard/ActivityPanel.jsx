import { Card } from "../ui/card"
import { FileText, Upload, MessageSquare, CheckCircle, Clock } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "upload",
    user: { name: "Alice Chen" },
    action: "uploaded",
    target: "Research_Data.xlsx",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Bob Wilson" },
    action: "commented on",
    target: "Literature review draft",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "complete",
    user: { name: "Carol Smith" },
    action: "completed",
    target: "Project timeline setup",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "file",
    user: { name: "John Doe" },
    action: "created",
    target: "Meeting_Notes.pdf",
    time: "2 hours ago",
  },
]

const files = [
  { id: "1", name: "Research_Data.xlsx", size: "2.4 MB", date: "Today" },
  { id: "2", name: "Project_Proposal.pdf", size: "1.8 MB", date: "Yesterday" },
  { id: "3", name: "Presentation_v2.pptx", size: "5.2 MB", date: "Mar 18" },
]

const activityIcons = {
  upload: Upload,
  comment: MessageSquare,
  complete: CheckCircle,
  file: FileText,
}

const activityColors = {
  upload: "bg-chart-2/20 text-chart-2",
  comment: "bg-chart-4/20 text-chart-4",
  complete: "bg-primary/20 text-primary",
  file: "bg-chart-3/20 text-chart-3",
}

export function ActivityPanel() {
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
          <button className="text-xs font-medium text-primary hover:underline">
            View All
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activityColors[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium text-primary">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Recent Files</h3>
          <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
            Upload
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-secondary">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.size} • {file.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}