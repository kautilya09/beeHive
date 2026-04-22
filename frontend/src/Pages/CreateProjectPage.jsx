import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsAPI } from "../lib/api";
import { ArrowLeft, Plus, X } from "lucide-react";

function CreateProjectPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: [],
    teamSize: 3,
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData({ ...formData, requiredSkills: [...formData.requiredSkills, skill] });
      setSkillInput("");
    }
  };

  const removeSkill = (s) => {
    setFormData({ ...formData, requiredSkills: formData.requiredSkills.filter((x) => x !== s) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await projectsAPI.create({
        ...formData,
        teamSize: parseInt(formData.teamSize),
        deadline: formData.deadline || undefined,
      });
      navigate(`/projects/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button onClick={() => navigate("/projects")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </button>
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">Create a Project</h1>
        <p className="mb-6 text-sm text-muted-foreground">Describe your project and find teammates.</p>
        {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Project Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. AI Study Planner" className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Project goals and what you need..." className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Required Skills</label>
            <div className="flex gap-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Type skill + Enter" className="h-10 flex-1 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="button" onClick={addSkill} className="flex h-10 items-center gap-1 rounded-lg border border-border bg-secondary px-3 text-sm font-medium hover:bg-secondary/80"><Plus className="h-4 w-4" />Add</button>
            </div>
            {formData.requiredSkills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {formData.requiredSkills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {skill}<button type="button" onClick={() => removeSkill(skill)}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Team Size *</label>
              <input type="number" name="teamSize" value={formData.teamSize} onChange={handleChange} required min={2} max={20} className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Deadline (optional)</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="h-10 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectPage;
