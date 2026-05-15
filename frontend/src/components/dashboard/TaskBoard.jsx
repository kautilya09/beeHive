import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MoreHorizontal, Calendar, MessageSquare } from "lucide-react"
import { cn } from "../../lib/utils"
import { useState } from "react"

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
function TaskCard({ task, updateTaskStatus, deleteTask, editable }) {
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

          <button 
          onClick={() => deleteTask(task.id)}
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
              onClick={() => updateTaskStatus(task.id, "inprogress")}
              className="transition-all duration-200 rounded-md border border-blue-500/40 px-3 py-1 text-xs text-blue-400 hover:bg-blue-500/20 hover:scale-105 hover:shadow-md"
            >
              In Progress →
            </button>
          )}
          {task.status === "inprogress" && (
            <button
              onClick={() => updateTaskStatus(task.id, "done")}
              className="transition-all duration-200 rounded-md border border-green-500/40 px-3 py-1 text-xs text-green-400 hover:bg-green-500/20 hover:scale-105 hover:shadow-md"
            >
              Done →
            </button>
          )}
        </div>
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

export function TaskBoard( {editable = false} ) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Research project proposal", 
      description: "Draft initial proposal",
      status: "todo",
      priority: "high",
      tags: ["Research"],
      dueDate: "Mar 30",
      comments: 2,
      assignees: [],
    },
    {
      id: 2,
      title: "Literature Review", 
      description: "Collect sources",
      status: "inprogress",
      priority: "medium",
      tags: ["Writing"],
      dueDate: "Apr 2",
      comments: 1,
      assignees: [],
    },
  ])

  const [newTask, setNewTask] = useState({
    title:"",
    description:"",
    priority: "low",
  })
  
  const addTask = () => {
    if (!newTask.title.trim()) return

    const task = {
      id: Date.now(),
      title: newTask.title, 
      description: newTask.description,
      status: "todo",
      priority: newTask.priority,
      tags: ["General"],
      dueDate: "Apr 5",
      comments: 0,
      assignees: [],
    }

    setTasks(prev => [...prev, task])

    setNewTask({
      title:"",
      description: "",
      priority: "low",
    })
  }

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? {...task, status: newStatus} : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }
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
                  key={task.id} 
                  task={task} 
                  updateTaskStatus = {updateTaskStatus}
                  deleteTask = {deleteTask}
                  editable={editable}
                  />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}