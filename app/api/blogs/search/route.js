import { searchBlogs } from "@/services/blog.service";

export async function GET(request) {
  try {
    // Standard URL searchParams access
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    if (!q) {
      return Response.json({
        blogs: [],
        total: 0,
        pages: 0,
        page,
      });
    }

    const result = await searchBlogs({
      query: q,
      page,
      limit,
    });

    return Response.json(result);
  } catch (error) {
    if (
      error?.digest === "NEXT_PRERENDER_INTERRUPTED" ||
      error?.message?.includes("bail out of prerendering")
    ) {
      throw error;
    }

    console.error("Search API Error:", error);

    return Response.json(
      {
        message: "Failed to search blogs",
      },
      { status: 500 },
    );
  }
}