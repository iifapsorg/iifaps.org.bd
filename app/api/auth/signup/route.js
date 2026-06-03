// api/auth/signup/route.js

import { validateSignup } from "@/validations/authValidation";
import { createUser } from "@/services/user.service";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const error = validateSignup({ name, email, password });
    if (error) return Response.json({ error }, { status: 400 });

    await createUser({ name, email, password });
    return Response.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error.message); // 👈 add this

    if (error.message === "User with this email already exists") {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
