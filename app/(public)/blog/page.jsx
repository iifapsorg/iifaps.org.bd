import { getAllBlogs } from "@/services/blog.service";
import BlogList from "@/components/blog/BlogList";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { generateMetaData } from "@/utils/generateMetaData";

export const metadata = generateMetaData({ title: "Blog", description: "All blog posts" });
export const revalidate = 60;

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1");
  const { blogs, pages, total } = await getAllBlogs({ page, limit: 9 });

  return (
    <main>
      <Container className="py-12">
        <SectionTitle title="All Posts" subtitle={`${total} articles`} />
        <BlogList blogs={blogs} />

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/blog?page=${p}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  p === page ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
