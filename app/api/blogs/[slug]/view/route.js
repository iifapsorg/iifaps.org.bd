// app/api/blogs/[slug]/view/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getBlogBySlug, incrementBlogViews } from "@/services/blog.service";

// Prevent counting multiple views from the same browser within 24 hours.
const VIEW_COOKIE_PREFIX = "blog_view_";
const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request, { params }) {
  try {
    // In Next.js dynamic route handlers, params may be asynchronous.
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 },
      );
    }

    // Resolve the blog first so the view can be associated
    // with a valid database record.
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blogId = blog._id.toString();

    const cookieStore = await cookies();

    // Use the blog ID instead of the slug so the view cookie
    // remains valid even if the blog slug changes later.
    const cookieName = `${VIEW_COOKIE_PREFIX}${blogId}`;

    const existingView = cookieStore.get(cookieName);

    // Skip the database update if this browser has already
    // generated a view within the cookie lifetime.
    if (existingView) {
      return NextResponse.json({
        success: true,
        counted: false,
        message: "View already counted",
      });
    }

    // Increment the view only after confirming that no
    // recent view cookie exists for this blog.
    const updatedBlog = await incrementBlogViews(blogId);

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Failed to update views" },
        { status: 500 },
      );
    }

    // Store the view marker as an HTTP-only cookie so it
    // cannot be accessed or modified by client-side JavaScript.
    cookieStore.set(cookieName, "1", {
      maxAge: VIEW_COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      counted: true,
      views: updatedBlog.views,
    });
  } catch (error) {
    // Log the actual error on the server while returning
    // a generic error message to the client.
    console.error("BLOG_VIEW_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update blog views" },
      { status: 500 },
    );
  }
}
