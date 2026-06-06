// api/categories/[id]/route

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/services/category.service";

import { categorySchemaZ } from "@/validations/category.validation";

/* ---------------------------
   GET SINGLE
----------------------------*/
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ---------------------------
   UPDATE
----------------------------*/
export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const body = await req.json();

    const parsed = categorySchemaZ.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const category = await updateCategory(id, parsed.data, session.user);
    revalidatePath("/admin/categories");

    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ---------------------------
   DELETE (SOFT)
----------------------------*/
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    await deleteCategory(id, session.user);
    revalidatePath("/admin/categories");

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
