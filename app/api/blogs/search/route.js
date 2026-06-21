import { NextResponse } from "next/server";
import { searchBlogs } from "@/services/blog.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // Validation
    if (!q) {
      return NextResponse.json(
        {
          success: false,
          message: "Search query is required",
          blogs: [],
        },
        { status: 400 }
      );
    }

    // Prevent abuse
    const safeLimit = Math.min(limit, 20);

    const result = await searchBlogs(q, {
      page,
      limit: safeLimit,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Search completed successfully",
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Search API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search blogs",
      },
      { status: 500 }
    );
  }
}