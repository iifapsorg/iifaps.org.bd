// /blog/page

import { getBlogs } from "@/services/blog.service";
import BlogCommonLayout from "@/components/blog/BlogCommonLayout";
import Container from "@/components/shared/Container";
import { generateMetaData } from "@/utils/generateMetaData";
import Link from "next/link";

export const metadata = generateMetaData({
  title: "Blog",
  description: "All blog posts",
});
export const revalidate = 60;

export default async function BlogPage({ searchParams }) {
  const { type, page } = await searchParams;

  const currentPage = Number(page) || 1;
  const ARTICLE_LIMIT = 6;

  // ====== filters by page, limit =====
  const filters = {
    page: currentPage,
    limit: ARTICLE_LIMIT,
  };

  // ======= type condition =======
  const currentType = type || "latest";
  switch (currentType) {
    case "featured":
      filters.featured = true;
      filters.sortBy = "createdAt";
      break;

    case "most-read":
      filters.sortBy = "views";
      break;

    default: // latest
      filters.sortBy = "createdAt";
  }

  // ======== getting articles by type =====
  const { blogs: allArticles, pages, total } = await getBlogs(filters);

  // const {
  //   blogs: allArticles,
  //   pages,
  //   total,
  // } = await getBlogs({
  //   page: currentPage,
  //   limit: ARTICLE_LIMIT,
  //   sortBy: type === "latest" ? "createdAt" : "views",
  // });

  return (
    <main>
      <Container className="py-12">
        <BlogCommonLayout
          blogs={allArticles}
          // sectionHeading={`${type?.replace(/-/g, " ") || "all"} articles : ${total}`}
          sectionHeading={`${currentType.replace(/-/g, " ")} articles : ${total}`}
          limit={ARTICLE_LIMIT}
          isBtn={false}
        />

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blogs?type=${currentType}&page=${p}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  p === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-600 hover:border-blue-400"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
