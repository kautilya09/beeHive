import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { MoreHorizontal, Mail, Omega } from "lucide-react"
import { useState } from "react"

const members = [
  {
    id: "1",
    name: "John Doe",
    role: "Team Lead",
    email: "john@university.edu",
    status: "online",
    tasksCompleted: 12,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Alice Chen",
    role: "Researcher",
    email: "alice@university.edu",
    status: "online",
    tasksCompleted: 8,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Bob Wilson",
    role: "Designer",
    email: "bob@university.edu",
    status: "away",
    tasksCompleted: 6,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Carol Smith",
    role: "Developer",
    email: "carol@university.edu",
    status: "offline",
    tasksCompleted: 10,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
  },
]

const statusColors = {
  online: "bg-primary",
  away: "bg-chart-3",
  offline: "bg-muted-foreground",
}

export function TeamMembers() {
  const [membersList, setMembersList] = useState(members)
  const removeMember = (id) => {
    setMembersList(prev => prev.filter(m => m.id !== id))
  }
  
  const [newMember, setNewMember] = useState({
    name: "",
    role: ""
  })
  const addMember = () => {
    if(!newMember.name.trim()) return

    const member = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role || "Member",
      email: "new@team.com",
      status: "online",
      tasksCompleted: 0,
      image: "",
    }

    setMembersList(prev=> [...prev, member])
    setNewMember("")
  }
  return (
    <Card className="border-border bg-card p-5">

      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Team Members
        </h3>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground">
          Manage
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          value={newMember.name}
          onChange={(e)=>setNewMember(prev => ({
            ...prev,
            name: e.target.value
          }))
          }
          onKeyDown={(e) => {
          if (e.key === "Enter") addMember()
          }}
          placeholder="Name"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
        <input 
          value={newMember.role}
          onChange={(e)=>setNewMember(prev => ({
            ...prev,
            role: e.target.value
          }))
          }
          placeholder="Role"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        />

        <button
        onClick={addMember}
        className="rounded-md bg-primary px-3 py-2 text-sm text-primary- foreground hover:bg-primary/90"
        >
          Add
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {membersList.map((member) => (
          <div
            key={member.id}
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-secondary"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.image} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                    statusColors[member.status]
                  }`}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {member.tasksCompleted} tasks
              </Badge>

              <button className="rounded p-1 opacity-0 hover:bg-muted group-hover:opacity-100">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </button>

              <button
              onClick={() => removeMember(member.id)}
              className="rounded p-1 opacity-0 hover:bg-red-500/20 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}