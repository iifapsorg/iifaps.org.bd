// lib/seedAdmin.js

import User from "@/models/User";

export async function seedSuperAdmin() {
  try {
    const { SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } =
      process.env;

    if (!SUPER_ADMIN_NAME || !SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
      throw new Error("Missing super admin env variables");
    }

    const existingAdmin = await User.findOne({
        // email: SUPER_ADMIN_EMAIL,
        role: "super_admin",
    });


    if (existingAdmin) return;

    await User.create({
      name: SUPER_ADMIN_NAME,
      email: SUPER_ADMIN_EMAIL.toLowerCase(),
      password: SUPER_ADMIN_PASSWORD,
      role: "super_admin",
    });

    console.log("✅ Super Admin created");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  }
}
