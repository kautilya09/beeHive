import { User, Bell, Shield, Palette, Globe, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { profileAPI } from "../lib/api"

const settingsSections = [
  { icon: User, label: "Profile", desc: "Manage your profile information" },
  { icon: Bell, label: "Notifications", desc: "Configure notification preferences" },
  { icon: Shield, label: "Privacy & Security", desc: "Password and security settings" },
  { icon: Palette, label: "Appearance", desc: "Customize theme and display" },
  { icon: Globe, label: "Language & Region", desc: "Language and timezone settings" },
]

function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile")
  const navigate = useNavigate()
  const { user, logout, refreshUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  const [profileData, setProfileData] = useState({
    name: "", branch: "", year: "", skills: "", interests: "", bio: "",
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        branch: user.branch || "",
        year: user.year || "",
        skills: (user.skills || []).join(", "),
        interests: (user.interests || []).join(", "),
        bio: user.bio || "",
      })
    }
  }, [user])

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  const handleProfileSave = async () => {
    setSaving(true)
    setSaveMsg("")
    try {
      await profileAPI.updateMe({
        name: profileData.name,
        branch: profileData.branch,
        year: profileData.year ? parseInt(profileData.year) : undefined,
        skills: profileData.skills.split(",").map(s => s.trim()).filter(Boolean),
        interests: profileData.interests.split(",").map(s => s.trim()).filter(Boolean),
        bio: profileData.bio,
      })
      await refreshUser()
      setSaveMsg("Profile saved!")
    } catch { setSaveMsg("Failed to save.") }
    finally { setSaving(false); setTimeout(() => setSaveMsg(""), 3000) }
  }

  const [notifications, setNotifications] = useState({
    email: true, push: true, taskUpdates: false, teamMessages: true,
  })

  const initials = (user?.name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <main className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="flex gap-6">
        <div className="w-56 shrink-0">
          <div className="rounded-xl border border-border bg-card p-2">
            {settingsSections.map(({ icon: Icon, label }) => (
              <button key={label} onClick={() => setActiveSection(label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${activeSection === label ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <Icon className="h-4 w-4 shrink-0" />{label}
              </button>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors" onClick={handleLogout}>
                <LogOut className="h-4 w-4 shrink-0" />Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {activeSection === "Profile" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Profile Information</h2>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{initials}</div>
                <div>
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
                    <input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Branch</label>
                    <input value={profileData.branch} onChange={(e) => setProfileData({...profileData, branch: e.target.value})} placeholder="e.g. CSE" className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Year</label>
                    <input type="number" min={1} max={4} value={profileData.year} onChange={(e) => setProfileData({...profileData, year: e.target.value})} className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Skills (comma separated)</label>
                    <input value={profileData.skills} onChange={(e) => setProfileData({...profileData, skills: e.target.value})} placeholder="React, Node.js, Python" className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Interests (comma separated)</label>
                  <input value={profileData.interests} onChange={(e) => setProfileData({...profileData, interests: e.target.value})} placeholder="AI, Web Dev, Robotics" className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Bio</label>
                  <textarea rows={3} value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} placeholder="Tell something about yourself..." className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleProfileSave} disabled={saving} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  {saveMsg && <span className="text-sm text-muted-foreground">{saveMsg}</span>}
                </div>
              </div>
            </div>
          )}

          {activeSection === "Notifications" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const labels = {
                    email: { title: "Email Notifications", desc: "Receive updates via email" },
                    push: { title: "Push Notifications", desc: "Browser push notifications" },
                    taskUpdates: { title: "Task Updates", desc: "Notify when tasks are updated" },
                    teamMessages: { title: "Team Messages", desc: "Notifications for team chats" },
                  }
                  const { title, desc } = labels[key]
                  return (
                    <div key={key} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <button onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-primary" : "bg-secondary border border-border"}`}>
                        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {!["Profile", "Notifications"].includes(activeSection) && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold text-foreground">{activeSection}</h2>
              <p className="text-sm text-muted-foreground">This section is coming soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default SettingsPage
