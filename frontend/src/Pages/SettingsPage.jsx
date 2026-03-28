import { User, Bell, Shield, Palette, Globe, LogOut, ChevronRight } from "lucide-react"
import { useState } from "react"

const settingsSections = [
  { icon: User, label: "Profile", desc: "Manage your profile information" },
  { icon: Bell, label: "Notifications", desc: "Configure notification preferences" },
  { icon: Shield, label: "Privacy & Security", desc: "Password and security settings" },
  { icon: Palette, label: "Appearance", desc: "Customize theme and display" },
  { icon: Globe, label: "Language & Region", desc: "Language and timezone settings" },
]

function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskUpdates: false,
    teamMessages: true,
  })

  return (
    <main className="p-4 lg:p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="flex gap-6">

        <div className="w-56 shrink-0">
          <div className="rounded-xl border border-border bg-card p-2">
            {settingsSections.map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                onClick={() => setActiveSection(label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  activeSection === label
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </button>
            </div>
          </div>
        </div>


        <div className="flex-1">
          {activeSection === "Profile" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Profile Information</h2>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  U
                </div>
                <div>
                  <button className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
                    Change Photo
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">First Name</label>
                    <input
                      placeholder="Enter first name"
                      className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Last Name</label>
                    <input
                      placeholder="Enter last name"
                      className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <input
                    placeholder="Enter email address"
                    type="email"
                    className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
                  <input
                    placeholder="Enter your role"
                    className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Bio</label>
                  <textarea
                    rows={3}
                    placeholder="Tell something about yourself..."
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
                <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
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
                      <button
                        onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-primary" : "bg-secondary border border-border"}`}
                      >
                        <div
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`}
                        />
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
