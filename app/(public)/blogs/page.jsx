// /blog/page

import { getBlogs } from "@/services/blog.service";
import BlogCommonLayout from "@/components/blog/BlogCommonLayout";
import Container from "@/components/shared/Container";
import { generateMetaData } from "@/utils/generateMetaData";
import Pagination from "@/components/blog/Pagination";

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

  return (
    <main>
      <Container className="py-12">
        {/* ====== blog ui ==== */}
        <BlogCommonLayout
          blogs={allArticles}
          sectionHeading={`${currentType.replace(/-/g, " ")} articles : ${total}`}
          limit={ARTICLE_LIMIT}
          cardProps={{
            showExcerpt: false,
            showReadMore: true,
          }}
        />

        {/* Pagination */}
        <Pagination
          pages={pages}
          currentPage={currentPage}
          currentType={currentType}
        />
      </Container>
    </main>
  );
}
