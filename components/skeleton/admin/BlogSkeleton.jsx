import React from "react";

const BlogSkeleton = () => {
  return (
    <>
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-md border bg-muted/40" />
          ))}
        </div>
        <div className="h-96 rounded-xl border bg-muted/20" />
      </div>
    </>
  );
};

export default BlogSkeleton;
