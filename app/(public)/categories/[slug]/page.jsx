import { notFound } from "next/navigation";
import { getBlogs } from "@/services/blog.service";
import Container from "@/components/shared/Container";
import BlogCard from "@/components/blog/BlogCard";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const { blogs } = await getBlogs({
    category: slug,
    limit: 12,
  });

  if (!blogs.length) {
    notFound();
  }

  return (
    <Container className="py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </Container>
  );
}
