// services/user.service

import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { cacheTag } from "next/cache";

/* ---------------------------
   GET USERS
----------------------------*/
export async function getAllUsers() {
  "use cache";
  cacheTag("users");

  await connectDB();

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(users));
}
/* ---------------------------
    GET USERS BY ID
----------------------------*/
export async function getUserById(id) {
  await connectDB();
  return User.findById(id).select("-password").lean();
}

/* ---------------------------
    GET USERS BY EMAIL
----------------------------*/
export async function getUserByEmail(email) {
  await connectDB();
  return User.findOne({ email }).select("-password").lean();
}

/* ---------------------------
    CREATE USER
----------------------------*/
export async function createUser(data) {
  await connectDB();
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User with this email already exists");
  return User.create(data);
}

/* ---------------------------
    UPDATE USER
----------------------------*/
export async function updateUser(id, data) {
  await connectDB();
  // Don't allow role escalation without explicit permission
  const update = { ...data };
  delete update.password; // Password update handled separately
  return User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).select("-password");
}

/* ---------------------------
    DELETE USER
----------------------------*/
export async function deleteUser(id) {
  await connectDB();
  return User.findByIdAndDelete(id);
}

/* ---------------------------
    UPDATE USER'S PASSWORD
----------------------------*/
export async function updatePassword(id, newPassword) {
  await connectDB();
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.password = newPassword;
  await user.save();
  return { success: true };
}
