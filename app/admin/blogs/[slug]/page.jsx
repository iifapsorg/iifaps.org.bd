// /admin/blogs/[slug]/page

import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

import { authOptions } from "@/lib/auth";
import { getBlogBySlug } from "@/services/blog.service";
import { formatDate } from "@/utils/formatDate";

export const dynamic = "force-dynamic";

export default async function AdminBlogPreviewPage({ params }) {
  const session = await getServerSession(authOptions);

  // 🔐 Only admin allowed
  if (!session) {
    redirect("/login");
  }

  const { slug } = await params;

  //   const blog = await getBlogBySlug(slug);
  const blog = await getBlogBySlug(slug, { admin: true });

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-10">
      {/* Status badge */}
      <div className="mb-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            blog.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {blog.status}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>

      {/* Meta */}
      <div className="mt-3 text-sm text-gray-500 flex gap-3">
        <span>{blog.author?.name}</span>
        <span>•</span>
        <span>{formatDate(blog.createdAt)}</span>
        <span>•</span>
        <span>{blog.views} views</span>
      </div>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="relative w-full h-80 mt-6 rounded-lg overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg mt-8"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
