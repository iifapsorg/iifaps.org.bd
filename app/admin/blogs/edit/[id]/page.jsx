// /admin/blogs/edit/[id]/page

import { notFound } from "next/navigation";
import { getBlogById } from "@/services/blog.service";
import BlogForm from "@/components/admin/blogs/BlogForm";

export const metadata = { title: "Edit Blog | Admin" };

export default async function EditBlogPage({ params }) {
    const {id} = await params;

  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog</h1>
      <BlogForm initialData={blog} />
    </div>
  );
}
