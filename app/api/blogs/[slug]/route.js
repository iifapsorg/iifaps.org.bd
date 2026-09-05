// api/blogs/[slug]/route

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBlogBySlug, updateBlog, deleteBlog } from "@/services/blog.service";
import { revalidatePath } from "next/cache";

/* ---------------------------
   GET SINGLE BLOG
----------------------------*/
export async function GET(req, { params }) {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ---------------------------
  UPDATE BLOG
----------------------------*/
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { slug } = await params;
    if (!slug)
      return NextResponse.json(
        { error: "Blog slug is reqiured." },
        { status: 400 },
      );

    const blog = await getBlogBySlug(slug);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const blogId = blog._id.toString();
    const updatedBlog = await updateBlog(blogId, body);

    // Admin pages
    revalidatePath("/admin/blogs");

    // Public blog pages
    revalidatePath("/blogs");

    return NextResponse.json({ updatedBlog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ---------------------------
  DELETE (SOFT) BLOG
----------------------------*/
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { slug } = await params;

    if (!slug)
      return NextResponse.json(
        { error: "Blog slug is reqiured." },
        { status: 400 },
      );

    const blog = await getBlogBySlug(slug);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const blogId = blog._id.toString();


    await deleteBlog(blogId);
    // Admin pages
    revalidatePath("/admin/blogs");

    // Public blog pages
    revalidatePath("/blogs");
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
