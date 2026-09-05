// components/blog/blogVewTracker

"use client";

import { useEffect } from "react";

export default function BlogViewTracker({ slug }) {
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blogs/${slug}/view`, {
      method: "POST",
    }).catch((error) => {
      console.error("Failed to track blog view:", error);
    });
  }, [slug]);

  return null;
}