// /blog/[slug]/page

import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs } from "@/services/blog.service";
import BlogDetails from "@/components/blog/BlogDetails";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import Container from "@/components/shared/Container";
import { generateBlogMetaData } from "@/utils/generateMetaData";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  return generateBlogMetaData(blog);
}

export const revalidate = 300;

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  console.log("BLOG DATA:", blog);
  console.log("BLOG SLUG:", slug);
  if (!blog) notFound();

  const related = await getRelatedBlogs(blog?._id, blog?.category._id);

  return (
    <main>
      <Container className="py-12">
        <BlogDetails blog={blog} />
        <RelatedBlogs blogs={related} />
      </Container>
    </main>
  );
}
