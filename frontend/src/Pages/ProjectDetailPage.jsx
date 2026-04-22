import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsAPI } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Users, Calendar, Loader2, Check, X } from "lucide-react";

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProject(); }, [id]);

  const fetchProject = async () => {
    try {
      const res = await projectsAPI.getById(id);
      setProject(res.data);
    } catch { navigate("/projects"); }
    finally { setLoading(false); }
  };

  const handleManage = async (userId, status) => {
    try {
      await projectsAPI.manageApplicant(id, userId, status);
      fetchProject();
    } catch (err) { alert(err.response?.data?.message || "Action failed"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!project) return null;

  const uid = user?.id || user?._id;
  const isOwner = project.owner?._id === uid;

  return (
    <div className="mx-auto max-w-3xl">
      <button onClick={() => navigate("/projects")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </button>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
          {isOwner && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Your Project</span>}
        </div>
        <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap">{project.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {project.members?.length || 1} / {project.teamSize} members</span>
          {project.deadline && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(project.deadline).toLocaleDateString()}</span>}
          <span>By <strong className="text-foreground">{project.owner?.name}</strong></span>
        </div>

        {project.requiredSkills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.requiredSkills.map((s, i) => (
              <span key={i} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>
            ))}
          </div>
        )}
      </div>

      {/* Members */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Team Members</h2>
        {project.members?.length > 0 ? (
          <div className="space-y-3">
            {project.members.map((m) => (
              <div key={m._id || m} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {(m.name || "?")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{m.name || "Member"}</p>
                  <p className="text-xs text-muted-foreground">{m.email || ""}</p>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-muted-foreground">No members yet.</p>}
      </div>

      {/* Applicants – visible only to owner */}
      {isOwner && project.applicants?.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Join Requests</h2>
          <div className="space-y-3">
            {project.applicants.map((a) => {
              const applicant = a.user || {};
              return (
                <div key={applicant._id || a.user} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-chart-2/10 text-sm font-bold text-chart-2">
                      {(applicant.name || "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{applicant.name || "Student"}</p>
                      <p className="text-xs text-muted-foreground">{applicant.email || ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.status === "pending" ? (
                      <>
                        <button onClick={() => handleManage(applicant._id, "accepted")} className="flex items-center gap-1 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-500/20">
                          <Check className="h-3.5 w-3.5" /> Accept
                        </button>
                        <button onClick={() => handleManage(applicant._id, "rejected")} className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-500/20">
                          <X className="h-3.5 w-3.5" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${a.status === "accepted" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;
