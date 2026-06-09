// components/blog/blogcard

import Link from "next/link";
import Image from "next/image";
import { formatShortDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";

export default function BlogCard({ blog }) {
  const { text: readTime } = readingTime(blog.content || blog.excerpt || "");

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {blog.thumbnail && (
        <Link href={`/blog/${blog.slug}`} className="block overflow-hidden h-48 relative">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      )}
      <div className="p-5">
        {blog.category && (
          <Link
            href={`/category/${blog.category.slug}`}
            className="text-xs font-semibold text-blue-600 uppercase tracking-wide hover:text-blue-800"
          >
            {blog.category.name}
          </Link>
        )}
        <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
        {blog.excerpt && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{blog.excerpt}</p>
        )}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{formatShortDate(blog.createdAt)}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}
