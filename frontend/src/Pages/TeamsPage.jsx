import { TeamMembers } from "../components/dashboard/TeamMembers"

function TeamsPage() {
  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Teams</h1>
        <p className="mt-1 text-muted-foreground">Manage your team and collaborate together.</p>
      </div>
      <div className="max-w-xl">
        <TeamMembers editable={true} />
      </div>
    </main>
  )
}

export default TeamsPage
