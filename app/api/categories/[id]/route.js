// api/categories/[id]/route

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import mongoose from "mongoose";

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
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      category,
    });
  } catch (error) {
    console.error("GET_CATEGORY_ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch category",
      },
      { status: 500 }
    );
  }
}

/* ---------------------------
   UPDATE
----------------------------*/
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "super_admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const parsed = categorySchemaZ.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const category = await updateCategory(
      id,
      parsed.data,
      session.user
    );

    if (!category) {
      return NextResponse.json(
        {
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    // Invalidate category cache
    revalidateTag("categories", "max");

    // Revalidate categories page
    revalidatePath("/admin/categories");

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("UPDATE_CATEGORY_ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update category",
      },
      { status: 500 }
    );
  }
}

/* ---------------------------
   DELETE - SOFT
----------------------------*/
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error: "Invalid category ID",
        },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "super_admin") {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    const deletedCategory = await deleteCategory(
      id,
      session.user
    );

    if (!deletedCategory) {
      return NextResponse.json(
        {
          error:
            "Category not found or already deleted",
        },
        { status: 404 }
      );
    }

    /*
     * IMPORTANT
     *
     * getCategoryTree() uses unstable_cache
     * with the "categories" tag.
     *
     * Therefore invalidate the tag after mutation.
     */
    revalidateTag("categories", "max");

    /*
     * Revalidate the admin categories page.
     */
    revalidatePath("/admin/categories");

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_CATEGORY_ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete category",
      },
      { status: 500 }
    );
  }
}