// api/categories/route

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

import {
  getAllCategories,
  getCategoryTree,
  createCategory,
} from "@/services/category.service";

import { categorySchemaZ } from "@/validations/category.validation";

/* ---------------------------
   GET
----------------------------*/
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tree = searchParams.get("tree") === "true";

    const categories = tree
      ? await getCategoryTree()
      : await getAllCategories();

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ---------------------------
   CREATE
----------------------------*/
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "admin") {
    //   return NextResponse.json(
    //     { error: "Forbidden" },
    //     { status: 403 }
    //   );
    // }

    const body = await request.json();

    const parsed = categorySchemaZ.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const category = await createCategory(parsed.data, session.user);
    // Invalidate category cache
    revalidateTag("categories", "max");

    // Revalidate admin category page
    revalidatePath("/admin/categories");

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
