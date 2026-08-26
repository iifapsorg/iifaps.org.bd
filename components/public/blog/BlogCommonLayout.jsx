// components/blog/BlogCommonLayout
import Link from "next/link";

import BlogCard from "./BlogCard";
import Text from "@/components/shared/Text";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export default function BlogCommonLayout({
  blogs = [],
  sectionHeading,
  isBtn = true,
  btnText = "View All Articles",
  btnVariant = "primary",
  currentType = "latest",
  cardProps = {},
}) {
  if (!blogs.length) return null;

  return (
    <section className="my-20">
      <Container>
        {/* Section Heading */}
        <Text variant="sectionHeading" className="my-8 capitalize">
          {sectionHeading}
        </Text>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} {...cardProps} />
          ))}
        </div>

        {/* View All */}
        {isBtn && (
          <Link
            href={`/blogs?type=${currentType}`}
            className="mx-auto block w-fit"
          >
            <Button variant={btnVariant} className="my-10 px-20">
              {btnText}
            </Button>
          </Link>
        )}
      </Container>
    </section>
  );
}