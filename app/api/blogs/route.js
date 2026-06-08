// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { getAllBlogs, createBlog } from "@/services/blog.service";
// import { revalidatePath } from "next/cache";


// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const category = searchParams.get("category");

//     const result = await getAllBlogs({ page, limit, category });
//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();
//     const blog = await createBlog({ ...body, author: session.user.id });
//     return NextResponse.json({ blog }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }





// app/api/blogs/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import {
  getAllBlogs,
  createBlog,
} from "@/services/blog.service";

import { blogSchemaZ } from "@/validations/blog.validation";

/* ---------------------------
   GET
----------------------------*/
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const category = searchParams.get("category") || "";

    const result = await getAllBlogs({
      page,
      limit,
      category,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ---------------------------
   CREATE
----------------------------*/
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const parsed = blogSchemaZ.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.errors,
        },
        { status: 400 }
      );
    }

    const blog = await createBlog({
      ...parsed.data,
      author: session.user.id,
    });

    // Admin pages
    revalidatePath("/admin/blogs");

    // Public blog pages
    revalidatePath("/blogs");

    return NextResponse.json(
      { blog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
