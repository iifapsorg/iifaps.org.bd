// components/blog/BlogCommonLayout

import BlogCard from "./BlogCard";
import Text from "@/components/shared/Text";
import Container from "@/components/shared/Container";
import Button from "../shared/Button";
import Link from "next/link";

export default function BlogCommonLayout({
  blogs = [],
  sectionHeading,
  limit = 3,
  total,
  isBtn = true,
  btnText = "View All Articles",
  btnVariant = "primary",
  type = "latest"
  
}) {
  // Apply limit if provided
  const displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

  if (!displayedBlogs.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <section className="my-20">
      <Container>
        {/* ======= Section Heading ===== */}
        <Text variant="sectionHeading" className="my-8 capitalize">
          {sectionHeading} {total && `: ${total}`}
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* ===== see more btn ====== */}
        {isBtn && (
          <Link href={`/blogs?type=${type}&page=${1}`}>
            <Button variant={btnVariant} className="my-10 block mx-auto px-20">
              {btnText}
            </Button>
          </Link>
        )}

      </Container>
    </section>
  );
}
