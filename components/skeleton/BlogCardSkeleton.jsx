// components/blog/BlogCardSkeleton.jsx

const BlogCardSkeleton = () => {
  return (
    <article className="w-full animate-pulse overflow-hidden rounded-2xl border border-border bg-background shadow-md">
      {/* Thumbnail */}
      <div className="aspect-video w-full bg-muted" />

      <div className="space-y-4 p-5">
        {/* Date + Read Time */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-36 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-7 w-full rounded bg-muted" />
          <div className="h-7 w-3/4 rounded bg-muted" />
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>

        {/* Author + Views */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
        </div>

        {/* Button */}
        <div className="flex justify-center pt-6">
          <div className="h-11 w-36 rounded-lg bg-muted" />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;