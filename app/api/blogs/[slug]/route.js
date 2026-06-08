import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBlogBySlug, updateBlog, deleteBlog } from "@/services/blog.service";
import { revalidatePath } from "next/cache";


// export async function GET(request, { params }) {
//   try {
//     const { id } = await params;
//     const blog = await getBlogById(id);
//     if (!blog)
//       return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//     return NextResponse.json({ blog });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

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

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id } = await params;
    const blog = await updateBlog(id, body);
    if (!blog)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    // Admin pages
    revalidatePath("/admin/blogs");

    // Public blog pages
    revalidatePath("/blog");

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;

    await deleteBlog(id);
    // Admin pages
    revalidatePath("/admin/blogs");

    // Public blog pages
    revalidatePath("/blog");
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
