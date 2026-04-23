import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.js";
import profileRoutes from "./src/routes/profile.js";
import projectRoutes from "./src/routes/projects.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import taskRoutes from "./src/routes/tasks.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Health check
app.get("/test", (req, res) => {
  res.json({ message: "Backend working" });
});

// Start server
const PORT = process.env.PORT || 2026;
const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(chalk.redBright("Server Crash!!", err));
  } else {
    console.log(
      chalk.greenBright.bold(
        "🚀 Node has started using port:",
        server.address().port
      )
    );
  }
});