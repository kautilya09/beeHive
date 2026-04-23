import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MoreHorizontal, Calendar, MessageSquare, ClipboardList, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { useState, useEffect } from "react"
import { tasksAPI } from "../../lib/api"

const priorityColors = {
  low: "bg-chart-2/20 text-chart-2",
  medium: "bg-chart-3/20 text-chart-3",
  high: "bg-destructive/20 text-destructive",
}
const columns = [
  {id:"todo", title:"To Do", color:"bg-orange-500" },
  {id: "inprogress", title:"In Progress", color: "bg-blue-500"},
  {id: "done", title: "Done", color: "bg-green-500"},
]
function TaskCard({ task, updateTaskStatus, deleteTask }) {
  return (
    <Card className="group cursor-pointer border-border bg-card p-4 hover:border-primary/50">
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {(task.tags || []).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

          <button 
          onClick={() => deleteTask(task._id)}
          className="rounded p-1 opacity-0 hover:bg-red-500/20 group-hover:opacity-100">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-red-400" />
          </button>
      </div>

      <h4 className="mt-3 text-sm font-medium text-foreground">{task.title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">
        {task.description}
      </p>

        <div className="mt-3 flex gap-2">
          {task.status === "todo" && (
            <button
              onClick={() => updateTaskStatus(task._id, "inprogress")}
              className="transition-all duration-200 rounded-md border border-blue-500/40 px-3 py-1 text-xs text-blue-400 hover:bg-blue-500/20 hover:scale-105 hover:shadow-md"
            >
              In Progress →
            </button>
          )}
          {task.status === "inprogress" && (
            <button
              onClick={() => updateTaskStatus(task._id, "done")}
              className="transition-all duration-200 rounded-md border border-green-500/40 px-3 py-1 text-xs text-green-400 hover:bg-green-500/20 hover:scale-105 hover:shadow-md"
            >
              Done →
            </button>
          )}
        </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {task.dueDate}
            </div>
          )}
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
    </Card>
  )
}

export function TaskBoard( {editable = false} ) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [newTask, setNewTask] = useState({
    title:"",
    description:"",
    priority: "low",
  })

  // Fetch tasks from backend on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await tasksAPI.getAll()
        setTasks(res.data)
      } catch (err) {
        console.error("Failed to fetch tasks:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])
  
  const addTask = async () => {
    if (!newTask.title.trim()) return

    try {
      const res = await tasksAPI.create({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        tags: ["General"],
      })

      setTasks(prev => [res.data, ...prev])
      setNewTask({
        title:"",
        description: "",
        priority: "low",
      })
    } catch (err) {
      console.error("Failed to create task:", err)
    }
  }

  const updateTaskStatus = async (id, newStatus) => {
    // Optimistic update
    setTasks(prev =>
      prev.map(task =>
        task._id === id ? {...task, status: newStatus} : task
      )
    )

    try {
      await tasksAPI.update(id, { status: newStatus })
    } catch (err) {
      console.error("Failed to update task:", err)
      // Revert on failure
      const res = await tasksAPI.getAll()
      setTasks(res.data)
    }
  }

  const deleteTask = async (id) => {
    // Optimistic update
    const previousTasks = tasks
    setTasks(prev => prev.filter(task => task._id !== id))

    try {
      await tasksAPI.delete(id)
    } catch (err) {
      console.error("Failed to delete task:", err)
      setTasks(previousTasks)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Task Board</h2>
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  const allEmpty = tasks.length === 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Task Board</h2>
        {editable && (
          <div className="flex gap-2">
            <input
              value={newTask.title}
              onChange={(e)=>setNewTask(prev => ({
                ...prev, title: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask()
              }}         
              placeholder="Task Title"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
            <input
              value={newTask.description}
              onChange={(e)=>setNewTask(prev => ({
                ...prev, description: e.target.value }))
              }          
              placeholder="Description"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
            
            <select
              value={newTask.priority}
              onChange={(e)=>
                setNewTask(prev => ({ ...prev, priority: e.target.value}))
              }
              className="rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>


            <button
              onClick={addTask}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {allEmpty && !editable ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ClipboardList className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            No tasks yet
          </h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Head to the Tasks page to create and manage your team tasks.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", column.color)} />
                <h3 className="text-sm font-medium text-foreground">
                  {column.title}
                </h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {tasks.filter(task => task.status === column.id).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter(task => task.status === column.id)
                  .map(task=>(
                    <TaskCard 
                    key={task._id} 
                    task={task} 
                    updateTaskStatus={updateTaskStatus}
                    deleteTask={deleteTask}
                    />
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}