import { Card } from "../ui/card"
import { MoreHorizontal, Calendar, ClipboardList, Loader2, FolderKanban, Clock, AlertTriangle } from "lucide-react"
import { cn } from "../../lib/utils"
import { useState, useEffect } from "react"
import { tasksAPI } from "../../lib/api"

const priorityColors = {
  low: "bg-chart-2/20 text-chart-2",
  medium: "bg-chart-3/20 text-chart-3",
  high: "bg-destructive/20 text-destructive",
}

const columns = [
  { id: "todo", title: "To Do", color: "bg-orange-500" },
  { id: "inprogress", title: "In Progress", color: "bg-blue-500" },
  { id: "done", title: "Done", color: "bg-green-500" },
]

/* ── Due-date badge helper ────────────────────────────────────────────────── */
function getDueDateBadge(dueDate) {
  if (!dueDate) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)

  const diffMs = due - today
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  const formatted = due.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  if (diffDays < 0) {
    return { label: `Overdue · ${formatted}`, className: "bg-red-500/15 text-red-400 border border-red-500/20", icon: AlertTriangle }
  }
  if (diffDays === 0) {
    return { label: "Due today", className: "bg-orange-500/15 text-orange-400 border border-orange-500/20", icon: Clock }
  }
  if (diffDays <= 3) {
    return { label: `Due ${formatted}`, className: "bg-amber-500/15 text-amber-400 border border-amber-500/20", icon: Clock }
  }
  return { label: formatted, className: "bg-secondary text-muted-foreground", icon: Calendar }
}

/* ── TaskCard ─────────────────────────────────────────────────────────────── */
function TaskCard({ task, updateTaskStatus, deleteTask, showProject }) {
  const dueBadge = getDueDateBadge(task.dueDate)
  const DueIcon = dueBadge?.icon

  return (
    <Card className="group cursor-pointer border-border bg-card p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
      {/* Header row: title + delete */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold leading-snug text-foreground">
          {task.title}
        </h4>
        <button
          onClick={() => deleteTask(task._id)}
          className="shrink-0 rounded p-1 opacity-0 transition-opacity hover:bg-red-500/20 group-hover:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-red-400" />
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {task.description}
        </p>
      )}

      {/* Project name (secondary metadata) */}
      {showProject && task.project?.title && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <FolderKanban className="h-3 w-3 text-primary/70" />
          <span className="text-xs text-muted-foreground">
            {task.project.title}
          </span>
        </div>
      )}

      {/* Tags row */}
      {(task.tags || []).length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Status transition buttons */}
      <div className="mt-3 flex gap-2">
        {task.status === "todo" && (
          <button
            onClick={() => updateTaskStatus(task._id, "inprogress")}
            className="rounded-md border border-blue-500/40 px-3 py-1 text-xs text-blue-400 transition-all duration-200 hover:scale-105 hover:bg-blue-500/20 hover:shadow-md"
          >
            Start →
          </button>
        )}
        {task.status === "inprogress" && (
          <button
            onClick={() => updateTaskStatus(task._id, "done")}
            className="rounded-md border border-green-500/40 px-3 py-1 text-xs text-green-400 transition-all duration-200 hover:scale-105 hover:bg-green-500/20 hover:shadow-md"
          >
            Done ✓
          </button>
        )}
      </div>

      {/* Footer: due date + priority */}
      <div className="mt-3 flex items-center justify-between">
        {dueBadge ? (
          <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium", dueBadge.className)}>
            <DueIcon className="h-3 w-3" />
            {dueBadge.label}
          </div>
        ) : (
          <span />
        )}

        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium capitalize",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>
    </Card>
  )
}

/* ── TaskBoard ────────────────────────────────────────────────────────────── */
export function TaskBoard({ editable = false, projectId = null }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  })

  // Fetch tasks from backend on mount / when projectId changes
  useEffect(() => {
    setLoading(true)
    const fetchTasks = async () => {
      try {
        const res = projectId
          ? await tasksAPI.getByProject(projectId)
          : await tasksAPI.getAll()
        setTasks(res.data)
      } catch (err) {
        console.error("Failed to fetch tasks:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [projectId])

  const addTask = async () => {
    if (!newTask.title.trim()) return

    try {
      const res = await tasksAPI.create({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        tags: ["General"],
        dueDate: newTask.dueDate || "",
        project: projectId,
      })

      setTasks((prev) => [res.data, ...prev])
      setNewTask({ title: "", description: "", priority: "low", dueDate: "" })
    } catch (err) {
      console.error("Failed to create task:", err)
    }
  }

  const updateTaskStatus = async (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    )

    try {
      await tasksAPI.update(id, { status: newStatus })
    } catch (err) {
      console.error("Failed to update task:", err)
      const res = projectId
        ? await tasksAPI.getByProject(projectId)
        : await tasksAPI.getAll()
      setTasks(res.data)
    }
  }

  const deleteTask = async (id) => {
    const previousTasks = tasks
    setTasks((prev) => prev.filter((task) => task._id !== id))

    try {
      await tasksAPI.delete(id)
    } catch (err) {
      console.error("Failed to delete task:", err)
      setTasks(previousTasks)
    }
  }

  /* ── Loading state ─────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  const showProject = !projectId

  return (
    <div className="space-y-4">
      {/* ── Add-task form (editable mode only) ───────────────────────────── */}
      {editable && (
        <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card/50 p-3">
          <input
            value={newTask.title}
            onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Enter") addTask() }}
            placeholder="Task title…"
            className="min-w-[140px] flex-[2] rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <input
            value={newTask.description}
            onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="min-w-[140px] flex-[2] rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
            className="rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask((prev) => ({ ...prev, priority: e.target.value }))}
            className="rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTask}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Add
          </button>
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ClipboardList className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No tasks yet
          </h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            {editable
              ? "Use the form above to add your first task."
              : "No tasks found for this view."}
          </p>
        </div>
      ) : (
        /* ── Kanban columns ──────────────────────────────────────────────── */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {columns.map((column) => {
            const colTasks = tasks.filter((t) => t.status === column.id)
            return (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", column.color)} />
                  <h3 className="text-sm font-medium text-foreground">
                    {column.title}
                  </h3>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                      showProject={showProject}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}