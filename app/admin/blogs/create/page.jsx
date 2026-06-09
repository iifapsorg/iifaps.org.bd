// /admin/blogs/create/page

import BlogForm from "@/components/admin/BlogForm";

export const metadata = { title: "Create Blog | Admin" };

export default function CreateBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog</h1>
      <BlogForm />
    </div>
  );
}
