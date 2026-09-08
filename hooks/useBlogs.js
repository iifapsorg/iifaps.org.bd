// hooks/useBlogs.js

"use client";

import { useState, useEffect, useCallback } from "react";

export function useBlogs({ page = 1, limit = 10, category } = {}) {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (category) {
        params.set("category", category);
      }

      const res = await fetch(`/api/blogs?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();

      setBlogs(data.blogs);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, limit, category]);

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (category) {
          params.set("category", category);
        }

        const res = await fetch(`/api/blogs?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();

        if (cancelled) return;

        setBlogs(data.blogs);
        setTotal(data.total);
        setPages(data.pages);
      } catch (err) {
        if (cancelled) return;

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, [page, limit, category]);

  return {
    blogs,
    total,
    pages,
    loading,
    error,
    refetch: fetchBlogs,
  };
}
