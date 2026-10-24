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

  return users.length ? JSON.parse(JSON.stringify(users)) : [];
}

/* ---------------------------
   GET USERS BY ID
----------------------------*/
export async function getUserById(id) {
  await connectDB();

  const user = await User.findById(id).select("-password").lean();

  return user ? JSON.parse(JSON.stringify(user)) : null;
}

/* ---------------------------
   GET USERS BY EMAIL
----------------------------*/
export async function getUserByEmail(email) {
  await connectDB();

  const user = await User.findOne({ email }).select("-password").lean();

  return user ? JSON.parse(JSON.stringify(user)) : null;
}

/* ---------------------------
   CREATE USER
----------------------------*/
export async function createUser(data) {
  await connectDB();

  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new Error("User with this email already exists");
  }

  const user = await User.create(data);

  const serializedUser = user.toObject();
  delete serializedUser.password;

  return JSON.parse(JSON.stringify(serializedUser));
}

/* ---------------------------
   UPDATE USER
----------------------------*/
export async function updateUser(id, data) {
  await connectDB();

  // Don't allow password updates through this function
  const update = { ...data };
  delete update.password;

  const user = await User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).select("-password");

  return user ? JSON.parse(JSON.stringify(user)) : null;
}

/* ---------------------------
   DELETE USER
----------------------------*/
export async function deleteUser(id) {
  await connectDB();

  const user = await User.findByIdAndDelete(id).select("-password");

  return user ? JSON.parse(JSON.stringify(user)) : null;
}

/* ---------------------------
   UPDATE USER'S PASSWORD
----------------------------*/
export async function updatePassword(id, newPassword) {
  await connectDB();

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.password = newPassword;
  await user.save();

  return { success: true };
}
