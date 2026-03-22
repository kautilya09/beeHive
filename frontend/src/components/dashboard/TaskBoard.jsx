import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MoreHorizontal, Calendar, MessageSquare } from "lucide-react"
import { cn } from "../../lib/utils"

const columns = [/* keep SAME data, just remove `as const` */]

const priorityColors = {
  low: "bg-chart-2/20 text-chart-2",
  medium: "bg-chart-3/20 text-chart-3",
  high: "bg-destructive/20 text-destructive",
}

function TaskCard({ task }) {
  return (
    <Card className="group cursor-pointer border-border bg-card p-4 hover:border-primary/50">
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="rounded p-1 opacity-0 hover:bg-secondary group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <h4 className="mt-3 text-sm font-medium text-foreground">{task.title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">
        {task.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {task.dueDate}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            {task.comments}
          </div>
        </div>

        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-4 flex -space-x-2">
        {task.assignees.slice(0, 3).map((assignee, index) => (
          <Avatar key={index} className="h-7 w-7 border-2 border-card">
            <AvatarImage src={assignee.image} />
            <AvatarFallback className="text-xs">
              {assignee.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </Card>
  )
}

export function TaskBoard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Task Board</h2>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", column.color)} />
              <h3 className="text-sm font-medium text-foreground">
                {column.title}
              </h3>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}