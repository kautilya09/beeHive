import express from "express";
import { protect } from "../middleware/auth.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

// ─── Create a project post ───────────────────────────────────────────────────
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, requiredSkills, teamSize, deadline } = req.body;

    if (!title || !description || !teamSize) {
      return res
        .status(400)
        .json({ message: "Title, description and team size are required" });
    }

    const project = await Project.create({
      title,
      description,
      requiredSkills: requiredSkills || [],
      teamSize,
      deadline: deadline || null,
      owner: req.user._id,
      members: [req.user._id], // owner is auto-added as a member
    });

    // Track on user side
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdProjects: project._id },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── List user's projects (owned + member) ───────────────────────────────────
router.get("/mine", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    })
      .populate("owner", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json(projects);
  } catch (error) {
    console.error("List my projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── List all projects ───────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json(projects);
  } catch (error) {
    console.error("List projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Get project detail ──────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("applicants.user", "name email skills")
      .populate("members", "name email skills")
      .lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Join request ────────────────────────────────────────────────────────────
router.post("/:id/join", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Can't join your own project
    if (project.owner.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You can't join your own project" });
    }

    // Already a member?
    if (project.members.some((m) => m.toString() === req.user._id.toString())) {
      return res
        .status(400)
        .json({ message: "You are already a member of this project" });
    }

    // Already applied?
    const alreadyApplied = project.applicants.some(
      (a) => a.user.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already requested to join" });
    }

    project.applicants.push({ user: req.user._id, status: "pending" });
    await project.save();

    // Track on user side
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { joinRequests: project._id },
    });

    res.json({ message: "Join request sent" });
  } catch (error) {
    console.error("Join request error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Accept / Reject applicant (project owner only) ─────────────────────────
router.patch("/:id/applicants/:userId", protect, async (req, res) => {
  try {
    const { status } = req.body; // "accepted" or "rejected"
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be accepted or rejected" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only the owner can accept/reject
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only project owner can manage applicants" });
    }

    const applicant = project.applicants.find(
      (a) => a.user.toString() === req.params.userId
    );
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = status;

    // If accepted, add to members
    if (status === "accepted") {
      project.members.push(req.params.userId);
    }

    await project.save();
    res.json({ message: `Applicant ${status}` });
  } catch (error) {
    console.error("Manage applicant error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
