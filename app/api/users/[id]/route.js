import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserById, updateUser, deleteUser } from "@/services/user.service";
import { userSchemaZ } from "@/validations/user.validation";
import { revalidatePath, revalidateTag } from "next/cache";
import mongoose from "mongoose";

/* ---------------------------
   AUTHORIZATION
----------------------------*/

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (session.user?.role !== "super_admin") {
    return {
      error: NextResponse.json({ error: "Sorry, you are not authorized to perform this action." }, { status: 403 }),
    };
  }

  return { session };
}

/* ---------------------------
   REVALIDATE USERS
----------------------------*/

function revalidateUsers() {
  revalidateTag("users", "max");
  revalidatePath("/admin/users");
}

/* ---------------------------
   GET SINGLE USER
----------------------------*/

export async function GET(request, { params }) {
  try {
    const auth = await requireAdmin();

    if (auth.error) return auth.error;

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user ID." }, { status: 400 });
    }

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET USER ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ---------------------------
   UPDATE USER
----------------------------*/

export async function PUT(request, { params }) {
  try {
    const auth = await requireAdmin();

    if (auth.error) return auth.error;

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user ID." }, { status: 400 });
    }

    const body = await request.json();

    // Validate request body
    const parsed = userSchemaZ.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Prevent super_admin from changing their own role
    const currentUserId = auth.session.user.id?.toString();

    if (
      currentUserId === existingUser._id.toString() &&
      parsed.data.role &&
      parsed.data.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "You cannot change your own admin role." },
        { status: 403 },
      );
    }

    const updatedUser = await updateUser(id, parsed.data);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user." },
        { status: 400 },
      );
    }

    revalidateUsers();

    return NextResponse.json({
      message: "User updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to update user." },
      { status: 500 },
    );
  }
}

/* ---------------------------
   DELETE (SOFT) USER
----------------------------*/

export async function DELETE(request, { params }) {
  try {
    const auth = await requireAdmin();

    if (auth.error) return auth.error;

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user ID." }, { status: 400 });
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Prevent admin from deleting their own account
    const currentUserId = auth.session.user.id?.toString();

    if (currentUserId === existingUser._id.toString()) {
      return NextResponse.json(
        { error: "You cannot delete your own account." },
        { status: 403 },
      );
    }

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return NextResponse.json(
        { error: "Failed to delete user." },
        { status: 400 },
      );
    }

    revalidateUsers();

    return NextResponse.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Failed to delete user." },
      { status: 500 },
    );
  }
}
