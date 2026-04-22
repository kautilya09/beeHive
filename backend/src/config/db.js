import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config();

let mongoServer = null;

export const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    // If no external MongoDB is configured or it's the default local URI,
    // try connecting to it first; if it fails, fall back to in-memory server.
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log("🗄️  MongoDB Connected (external)");
      return;
    } catch {
      console.log("⚠️  Local MongoDB not available, starting in-memory server...");
    }

    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log("🗄️  MongoDB Connected (in-memory)");
    console.log("💡 Note: Data will be lost when server restarts.");
    console.log("   For persistent data, install MongoDB locally or use MongoDB Atlas.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
