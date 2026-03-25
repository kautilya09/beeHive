import { cn } from "../../lib/utils"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FolderOpen,
  Settings,
  GraduationCap,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Users, label: "Teams", href: "#" },
  { icon: CheckSquare, label: "Tasks", href: "#" },
  { icon: FolderOpen, label: "Files", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                TeamSpace
              </span>
              <span className="text-xs text-muted-foreground">Student Hub</span>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.label)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <p className="text-sm font-medium text-sidebar-foreground">
              Need help?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check docs for guides.
            </p>
            <button className="mt-3 w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
              View Docs
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}