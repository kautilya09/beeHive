import express from "express";
import { protect } from "../middleware/auth.js";
import Task from "../models/Task.js";

const router = express.Router();

// ─── GET /tasks — all tasks for the logged-in user ───────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id })
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
    const { title, description, priority, tags, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description || "",
      status: "todo",
      priority: priority || "low",
      tags: tags || ["General"],
      dueDate: dueDate || "",
      owner: req.user._id,
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

    // Only the owner can update their task
    if (task.owner.toString() !== req.user._id.toString()) {
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

    if (task.owner.toString() !== req.user._id.toString()) {
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
