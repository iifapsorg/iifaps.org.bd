// /admin/blogs/edit/[id]/page

import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/services/blog.service";
import BlogForm from "@/components/admin/blogs/blog-form/BlogForm";

export const metadata = { title: "Edit Blog | Admin" };

export default async function EditBlogPage({ params }) {
    const {slug} = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog</h1>
      <BlogForm initialData={blog} />
    </div>
  );
}
