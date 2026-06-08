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
      const params = new URLSearchParams({ page, limit });
      if (category) params.set("category", category);
      const res = await fetch(`/api/blogs?${params}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data.blogs);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, total, pages, loading, error, refetch: fetchBlogs };
}
