import { ActivityPanel } from "../components/dashboard/ActivityPanel"

function FilesPage() {
  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Files</h1>
        <p className="mt-1 text-muted-foreground">All your team files and recent activity.</p>
      </div>
      <div className="max-w-xl">
        <ActivityPanel />
      </div>
    </main>
  )
}

export default FilesPage
