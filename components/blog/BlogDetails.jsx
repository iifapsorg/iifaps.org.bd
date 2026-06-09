// components/blog/blogdetails

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";

export default function BlogDetails({ blog }) {
    console.log("BLOG DATA:", blog);
  const { text: readTime } = readingTime(blog?.content);

  return (
    <article className="max-w-3xl mx-auto">
      {/* Meta */}
      <div className="mb-6">
        {blog?.category && (
          <Link
            href={`/category/${blog.category?.slug}`}
            className="text-sm font-semibold text-blue-600 uppercase tracking-wide hover:text-blue-800"
          >
            {blog.category?.name}
          </Link>
        )}
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 leading-tight">
          {blog?.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          {blog?.author && (
            <span className="font-medium text-gray-700">{blog.author.name}</span>
          )}
          <span>{formatDate(blog?.createdAt)}</span>
          <span>{readTime}</span>
          <span>{blog?.views} views</span>
        </div>
      </div>

      {/* Thumbnail */}
      {blog?.thumbnail && (
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden">
          <Image src={blog?.thumbnail} alt={blog.title} fill className="object-cover" />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      />

      {/* Tags */}
      {blog?.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog?.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
