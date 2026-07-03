// components/blog/blogcard

import Image from "next/image";
import Link from "next/link";

import Text from "@/components/shared/Text";
import Button from "@/components/shared/Button";

import { formatShortDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { CalendarDays } from "lucide-react";

export default function BlogCard({ blog }) {
  const readTime = readingTime(blog.title);

  return (
    <article className="pb-10 group overflow-hidden rounded-2xl border border-border bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail */}
      <Link
        href={`/blogs/${blog.slug}`}
        className="relative block aspect-video overflow-hidden"
      >
        <Image
          src={blog?.thumbnail}
          alt={blog?.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* ====  date and read time ===== */}
      <div className="space-y-4 p-5">
        {/* Date */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <p className="flex gap-x-2 text-lg items-center justify-center">
            <CalendarDays /> {formatShortDate(blog.createdAt)}
          </p>
          <Text>{readTime.text}</Text>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`}>
          <Text
            variant="title"
            className="mb-3 line-clamp-2 transition-colors group-hover:text-primary"
          >
            {blog.title}
          </Text>
        </Link>

        {/* Summary */}
        <Text className="line-clamp-3 text-muted-foreground">
          {blog.summary || blog.excerpt}
        </Text>

        {/* Author + Views */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>By {blog.author?.name || "Admin"}</span>
          <span>{blog.views || 0} Views</span>
        </div>

        {/* Button */}
        <Link href={`/blogs/${blog.slug}`}>
          <Button className="block mx-auto mt-10">Read More</Button>
        </Link>
      </div>
    </article>
  );
}
