// components/skeleton/HomeSkeletons.jsx

// Skeleton loader for Hero section
export function HeroSkeleton() {
  return (
    <div className="mx-auto my-8 max-w-7xl animate-pulse px-4">
      <div className="h-96 w-full rounded-2xl bg-muted/40" />
    </div>
  );
}

// Skeleton loader for Blog Grid sections
export function BlogGridSkeleton() {
  return (
    <div className="mx-auto my-12 max-w-7xl animate-pulse px-4">
      {/* Section Heading Skeleton */}
      <div className="mb-6 h-8 w-48 rounded-md bg-muted/50" />

      {/* Grid Items Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex h-72 flex-col justify-between rounded-xl border border-border/40 bg-muted/20 p-4"
          >
            <div className="h-40 w-full rounded-lg bg-muted/40" />
            <div className="mt-4 h-6 w-3/4 rounded bg-muted/40" />
            <div className="mt-2 h-4 w-1/2 rounded bg-muted/30" />
          </div>
        ))}
      </div>
    </div>
  );
}