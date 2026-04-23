import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { TaskBoard } from "../components/dashboard/TaskBoard"
import { projectsAPI } from "../lib/api"
import {
  CheckSquare,
  Layers,
  FolderKanban,
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Users,
} from "lucide-react"
import { cn } from "../lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  TasksPage — horizontal project cards → per-project / aggregated kanban   */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TasksPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [activeBoard, setActiveBoard] = useState("all") // "all" | projectId
  const scrollRef = useRef(null)

  /* ── Fetch user's projects ──────────────────────────────────────────────── */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getMine()
        setProjects(res.data)
      } catch (err) {
        console.error("Failed to fetch projects:", err)
      } finally {
        setLoadingProjects(false)
      }
    }
    fetchProjects()
  }, [])

  /* ── Horizontal scroll helpers ──────────────────────────────────────────── */
  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = 220
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  /* ── Derive active project for heading context ─────────────────────────── */
  const activeProject =
    activeBoard !== "all"
      ? projects.find((p) => p._id === activeBoard)
      : null

  return (
    <main className="p-4 lg:p-6">
      {/* ── Page heading ─────────────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <CheckSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
            <p className="text-sm text-muted-foreground">
              Select a project board or view all tasks across your workspace.
            </p>
          </div>
        </div>
      </div>

      {/* ── Project cards strip ──────────────────────────────────────────── */}
      {loadingProjects ? (
        <div className="mb-6 flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : (
        <div className="relative mb-6">
          {/* Scroll left button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-1.5 shadow-md transition-colors hover:bg-accent hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* ── "All Tasks" card ───────────────────────────────────────── */}
            <button
              onClick={() => setActiveBoard("all")}
              className={cn(
                "group relative flex min-w-[180px] shrink-0 flex-col rounded-xl border p-4 text-left transition-all duration-200",
                activeBoard === "all"
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-md"
              )}
            >
              <div className={cn(
                "mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                activeBoard === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
              )}>
                <Layers className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-sm font-semibold",
                activeBoard === "all" ? "text-primary" : "text-foreground"
              )}>
                All Tasks
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">
                Aggregated view
              </span>
            </button>

            {/* ── Project cards ──────────────────────────────────────────── */}
            {projects.map((project) => {
              const isActive = activeBoard === project._id
              const memberCount = project.members?.length || 1

              return (
                <button
                  key={project._id}
                  onClick={() => setActiveBoard(project._id)}
                  className={cn(
                    "group relative flex min-w-[200px] shrink-0 flex-col rounded-xl border p-4 text-left transition-all duration-200",
                    isActive
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-md"
                  )}
                >
                  <div className={cn(
                    "mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  )}>
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "text-sm font-semibold leading-tight line-clamp-1",
                    isActive ? "text-primary" : "text-foreground"
                  )}>
                    {project.title}
                  </span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {memberCount} member{memberCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -bottom-1.5 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}

            {/* ── "+ New Board" card ──────────────────────────────────────── */}
            <button
              onClick={() => navigate("/projects/create")}
              className="group flex min-w-[180px] shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-border p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary">
                + New Board
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">
                Create project
              </span>
            </button>
          </div>

          {/* Scroll right button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-1.5 shadow-md transition-colors hover:bg-accent hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* ── Board heading ────────────────────────────────────────────────── */}
      <div className="mb-4 flex items-center gap-2">
        {activeBoard === "all" ? (
          <>
            <Layers className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              All Tasks
            </h2>
          </>
        ) : (
          <>
            <FolderKanban className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              {activeProject?.title || "Project"} — Tasks
            </h2>
          </>
        )}
      </div>

      {/* ── Task Board ───────────────────────────────────────────────────── */}
      <TaskBoard
        key={activeBoard}
        editable={activeBoard !== "all"}
        projectId={activeBoard === "all" ? null : activeBoard}
      />
    </main>
  )
}

export default TasksPage
