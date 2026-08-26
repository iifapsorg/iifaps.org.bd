// components/blog/BlogCard.jsx

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import Text from "@/components/shared/Text";

import { formatShortDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import Button from "@/components/shared/Button";

export default function BlogCard({
  blog,
  showExcerpt = false,
  showReadMore = false,
}) {
  const {
    slug,
    title,
    thumbnail,
    excerpt = "",
    createdAt,
    category,
    author,
  } = blog;

  const blogUrl = `/blogs/${slug}`;

  const categoryName =
    typeof category === "string" ? category : category?.name || "Uncategorized";

  const authorName = author?.name || "Admin";
  const readTime = readingTime(excerpt);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ================= THUMBNAIL ================= */}
      <Link
        href={blogUrl}
        aria-label={`Read ${title}`}
        className="relative block aspect-video overflow-hidden"
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="space-y-4 p-5 pb-15">
        {/* Category + Reading Time */}
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="rounded-md border border-muted-foreground px-3 py-1 font-semibold">
            {categoryName}
          </span>

          <span>{readTime.text}</span>
        </div>

        {/* Title */}
        <Link href={blogUrl} className="block">
          <Text
            variant="title"
            className="line-clamp-2 text-foreground transition-colors duration-300 group-hover:text-muted-foreground"
          >
            {title}
          </Text>
        </Link>

        {/* ================= EXCERPT ================= */}
        {showExcerpt && excerpt && (
          <Text className="line-clamp-3 text-muted-foreground">{excerpt}</Text>
        )}

        {/* ================= AUTHOR + DATE ================= */}
        <div className="flex items-center justify-between gap-4 pt-2 text-sm text-muted-foreground">
          <span className="font-semibold">{authorName}</span>

          <time
            dateTime={createdAt}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <CalendarDays className="h-4 w-4" />
            {formatShortDate(createdAt)}
          </time>
        </div>

        {/* ================= READ MORE ================= */}
        {showReadMore && (
          <Link href={`/blogs/${blog.slug}`}>
            <Button className="block mx-auto mt-10">Read More</Button>
          </Link>
        )}
      </div>
    </article>
  );
}
