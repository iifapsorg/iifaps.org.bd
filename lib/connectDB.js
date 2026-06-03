// lib/connectDB.js

import mongoose from "mongoose";
import { seedSuperAdmin } from "./seedAdmin";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

let isSeeded = false;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;

    console.log("🟢 MongoDB connected successfully!");

    // ✅ run only once per server lifecycle
    if (!isSeeded) {
      isSeeded = true;
      await seedSuperAdmin();
    }

  } catch (e) {
    cached.promise = null;
    console.error("🔴 MongoDB connection failed:", e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
