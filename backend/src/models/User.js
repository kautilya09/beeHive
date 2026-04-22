import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed via bcryptjs
    branch: { type: String, default: "" },
    year: { type: Number },
    skills: [{ type: String }],
    interests: [{ type: String }],
    bio: { type: String, default: "" },
    createdProjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
    joinRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
