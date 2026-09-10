// components/blog/BlogDetailsSkeleton.jsx

const BlogDetailsSkeleton = () => {
  return (
    <article className="mx-auto max-w-3xl animate-pulse">
      {/* Category */}
      <div className="mb-3 h-4 w-24 rounded bg-muted" />

      {/* Title */}
      <div className="space-y-3">
        <div className="h-10 w-full rounded bg-muted" />
        <div className="h-10 w-3/4 rounded bg-muted" />
      </div>

      {/* Meta */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>

      {/* Thumbnail */}
      <div className="mt-8 h-80 w-full rounded-xl bg-muted" />

      {/* Content */}
      <div className="mt-8 space-y-4">
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-11/12 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-10/12 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-9/12 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-8/12 rounded bg-muted" />
      </div>

      {/* Tags */}
      <div className="mt-10 flex flex-wrap gap-3">
        <div className="h-8 w-20 rounded-full bg-muted" />
        <div className="h-8 w-24 rounded-full bg-muted" />
        <div className="h-8 w-16 rounded-full bg-muted" />
        <div className="h-8 w-28 rounded-full bg-muted" />
      </div>
    </article>
  );
};

export default BlogDetailsSkeleton;