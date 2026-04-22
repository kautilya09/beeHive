import express from "express";
import { protect } from "../middleware/auth.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

// ─── Dashboard: aggregated data for the logged-in user ───────────────────────
router.get("/me", protect, async (req, res) => {
  try {
    // Projects created by the user
    const myProjects = await Project.find({ owner: req.user._id })
      .populate("applicants.user", "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 })
      .lean();

    // Projects the user has requested to join
    const myJoinRequests = await Project.find({
      "applicants.user": req.user._id,
    })
      .populate("owner", "name email")
      .lean()
      .then((projects) =>
        projects.map((p) => {
          const myApp = p.applicants.find(
            (a) => a.user.toString() === req.user._id.toString()
          );
          return {
            ...p,
            myStatus: myApp ? myApp.status : "unknown",
          };
        })
      );

    // User profile summary
    const profile = await User.findById(req.user._id)
      .select("-password")
      .lean();

    res.json({
      profile,
      myProjects,
      myJoinRequests,
      stats: {
        totalCreated: myProjects.length,
        totalJoinRequests: myJoinRequests.length,
        pendingRequests: myJoinRequests.filter((r) => r.myStatus === "pending")
          .length,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
