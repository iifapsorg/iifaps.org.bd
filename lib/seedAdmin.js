// lib/seedAdmin.js

import User from "@/models/User";

export async function seedSuperAdmin() {
  const {
    SUPER_ADMIN_NAME,
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
  } = process.env;

  if (!SUPER_ADMIN_NAME || !SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
    throw new Error("Missing super admin environment variables");
  }

  const existingAdmin = await User.findOne({
    role: "super_admin",
  });

  if (existingAdmin) {
    console.log("ℹ️ Super Admin already exists");
    return;
  }

  await User.create({
    name: SUPER_ADMIN_NAME,
    email: SUPER_ADMIN_EMAIL.toLowerCase(),
    password: SUPER_ADMIN_PASSWORD,
    role: "super_admin",
  });

  console.log("✅ Super Admin created successfully");
}