"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BlogBasicFields from "./BlogBasicFields";
import BlogCategoryFields from "./BlogCategoryFields";
import BlogThumbnail from "./BlogThumbnail";
import BlogSeoFields from "./BlogSeoFields";
import BlogFormActions from "./BlogFormActions";
import {INITIAL_FORM } from "./blogForm.config";
import { getId } from "./utils";

export default function BlogForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    ...initialData,

    category: getId(initialData?.category),
    subCategory: getId(initialData?.subCategory),


    tags: Array.isArray(initialData?.tags)
      ? initialData.tags.join(", ")
      : initialData?.tags || "",

    featured: Boolean(initialData?.featured),
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  /* -----------------------------
   * LOAD CATEGORIES
   * ----------------------------- */

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await res.json();

        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadCategories();
  }, []);

  /* -----------------------------
   * CATEGORY DATA
   * ----------------------------- */

  const parentCategories = useMemo(
    () => categories.filter((category) => !category.parent),
    [categories],
  );

  const subCategories = useMemo(() => {
    if (!form.category) return [];

    return categories.filter(
      (category) => getId(category.parent) === form.category,
    );
  }, [categories, form.category]);

  /* -----------------------------
   * HANDLE CHANGE
   * ----------------------------- */

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,

      ...(name === "category" && {
        subCategory: "",
      }),
    }));
  }

  /* -----------------------------
   * IMAGE UPLOAD
   * ----------------------------- */

  async function handleImageUpload(file) {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Upload failed",
        );
      }

      setForm((prev) => ({
        ...prev,
        thumbnail: data.url,
      }));
    } catch (err) {
      setError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  /* -----------------------------
   * SUBMIT
   * ----------------------------- */

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const url = isEdit
        ? `/api/blogs/${initialData.slug}`
        : "/api/blogs";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Something went wrong",
        );
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl space-y-8"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <BlogBasicFields
        form={form}
        onChange={handleChange}
      />

      <BlogCategoryFields
        form={form}
        categories={parentCategories}
        subCategories={subCategories}
        onChange={handleChange}
      />

      <BlogThumbnail
        thumbnail={form.thumbnail}
        uploading={uploading}
        onUpload={handleImageUpload}
        onRemove={() =>
          setForm((prev) => ({
            ...prev,
            thumbnail: "",
          }))
        }
      />

      <BlogSeoFields
        form={form}
        onChange={handleChange}
      />

      <BlogFormActions
        loading={loading}
        isEdit={isEdit}
        onCancel={() => router.back()}
      />
    </form>
  );
}