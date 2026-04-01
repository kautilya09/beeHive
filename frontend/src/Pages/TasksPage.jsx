import { TaskBoard } from "../components/dashboard/TaskBoard"

function TasksPage() {
  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
        <p className="mt-1 text-muted-foreground">Track and manage all your team tasks.</p>
      </div>
      <TaskBoard editable={true} />
    </main>
  )
}

export default TasksPage
