import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";

import { getUsers, createUser } from "@/services/user.service";
import { userSchemaZ } from "@/validations/user.validation";

/* ---------------------------
   AUTHORIZATION
----------------------------*/

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  if (session.user?.role !== "super_admin") {
    return {
      error: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 },
      ),
    };
  }

  return { session };
}

/* ---------------------------
   GET USERS
----------------------------*/

export async function GET(request) {
  try {
    const auth = await requireAdmin();

    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit")) || 10),
    );

    const role = searchParams.get("role") || "";
    const search = searchParams.get("search") || "";

    const result = await getUsers({
      page,
      limit,
      role,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 },
    );
  }
}

/* ---------------------------
   CREATE USER
----------------------------*/

export async function POST(request) {
  try {
    const auth = await requireAdmin();

    if (auth.error) return auth.error;

    const body = await request.json();

    const parsed = userSchemaZ.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const user = await createUser(parsed.data);

    // Revalidate user cache
    revalidateTag("users", "max");

    // Admin pages
    revalidatePath("/admin/users");

    return NextResponse.json(
      { user },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create user." },
      { status: 500 },
    );
  }
}