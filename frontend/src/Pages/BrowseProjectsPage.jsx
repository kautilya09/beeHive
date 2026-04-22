import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import {
  Plus,
  Search,
  Users,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";

function BrowseProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (projectId) => {
    setJoiningId(projectId);
    try {
      await projectsAPI.joinRequest(projectId);
      // Refresh to update applicant list
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send join request");
    } finally {
      setJoiningId(null);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.requiredSkills?.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Browse Projects
          </h1>
          <p className="mt-1 text-muted-foreground">
            Discover projects and join teams that match your skills.
          </p>
        </div>
        <Link
          to="/projects/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by title, description, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-lg border border-border bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-lg font-medium text-foreground">
            No projects found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {search
              ? "Try a different search term"
              : "Be the first to create a project!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const isOwner = project.owner?._id === user?.id || project.owner?._id === user?._id;
            const hasApplied = project.applicants?.some(
              (a) => {
                const applicantId = a.user?._id || a.user;
                return applicantId === user?.id || applicantId === user?._id;
              }
            );

            return (
              <div
                key={project._id}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-base font-semibold text-foreground line-clamp-1">
                    {project.title}
                  </h3>
                  {isOwner && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Your Project
                    </span>
                  )}
                </div>

                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Skills */}
                {project.requiredSkills?.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.requiredSkills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.requiredSkills.length > 4 && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                        +{project.requiredSkills.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Meta */}
                <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {project.members?.length || 1} / {project.teamSize}
                  </span>
                  {project.deadline && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/projects/${project._id}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <div className="ml-auto">
                    {isOwner ? (
                      <span className="text-xs text-muted-foreground">
                        Owner
                      </span>
                    ) : hasApplied ? (
                      <span className="rounded-full bg-chart-3/10 px-3 py-1 text-xs font-medium text-chart-3">
                        Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => handleJoin(project._id)}
                        disabled={joiningId === project._id}
                        className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {joiningId === project._id ? "Joining..." : "Join"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Owner */}
                <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  By{" "}
                  <span className="font-medium text-foreground">
                    {project.owner?.name || "Unknown"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BrowseProjectsPage;
