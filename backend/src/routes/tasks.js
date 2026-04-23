import express from "express";
import { protect } from "../middleware/auth.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

const router = express.Router();

// ─── GET /tasks/project/:projectId — all tasks for a project ─────────────────
router.get("/project/:projectId", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("owner", "name")
      .sort({ createdAt: -1 })
      .lean();
    res.json(tasks);
  } catch (error) {
    console.error("Get project tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── GET /tasks — all tasks for the logged-in user ───────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }]
    });
    const projectIds = projects.map(p => p._id);

    const tasks = await Task.find({ project: { $in: projectIds } })
      .populate("project", "title")
      .sort({ createdAt: -1 })
      .lean();
    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── POST /tasks — create a new task ─────────────────────────────────────────
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, priority, tags, dueDate, project } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!project) {
      return res.status(400).json({ message: "Project is required" });
    }

    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isOwner = projectDoc.owner.toString() === req.user._id.toString();
    const isMember = projectDoc.members.some(m => m.toString() === req.user._id.toString());
    
    if (!isOwner && !isMember) {
      return res.status(403).json({ message: "Not authorized to create tasks in this project" });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description || "",
      status: "todo",
      priority: priority || "low",
      tags: tags || ["General"],
      dueDate: dueDate || "",
      owner: req.user._id,
      project: project,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── PATCH /tasks/:id — update a task (status, title, etc.) ──────────────────
router.patch("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const projectDoc = await Project.findById(task.project);
    const isOwner = projectDoc && projectDoc.owner.toString() === req.user._id.toString();
    const isMember = projectDoc && projectDoc.members.some(m => m.toString() === req.user._id.toString());
    const isTaskOwner = task.owner.toString() === req.user._id.toString();

    // Any project member or the task owner can update it
    if (!isOwner && !isMember && !isTaskOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "tags",
      "dueDate",
    ];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    }

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── DELETE /tasks/:id — delete a task ───────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const projectDoc = await Project.findById(task.project);
    const isOwner = projectDoc && projectDoc.owner.toString() === req.user._id.toString();
    const isMember = projectDoc && projectDoc.members.some(m => m.toString() === req.user._id.toString());
    const isTaskOwner = task.owner.toString() === req.user._id.toString();

    // Any project member or the task owner can delete it
    if (!isOwner && !isMember && !isTaskOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
