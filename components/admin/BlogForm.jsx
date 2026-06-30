// components/admin/blogform

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogEditor } from "@/components/admin/editor";

export default function BlogForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    thumbnail: initialData?.thumbnail || "",
    category: initialData?.category?._id || initialData?.category || "",
    tags: initialData?.tags?.join(", ") || "",
    status: initialData?.status || "draft",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []));
  }, []);

  /* ---------------------------
  *HANDLE CHANGE FUNCTION
  ----------------------------*/
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* ---------------------------
  *HANDLE IMAGE UPLOAD FUNCTION
  ----------------------------*/
  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Upload failed");
      }

      setForm((prev) => ({
        ...prev,
        thumbnail: data.url,
      }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  /* ---------------------------
  *HANDLE SUBMIT FUNCTION
  ----------------------------*/
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const url = isEdit ? `/api/blogs/${initialData._id}` : "/api/blogs";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className={labelClass}>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Blog title..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt</label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          rows={2}
          className={inputClass}
          placeholder="Short description..."
        />
      </div>

      <div>
        <label className={labelClass}>Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-gray-500"
        />
        {uploading && (
          <p className="text-xs text-blue-500 mt-1">Uploading...</p>
        )}
        {form.thumbnail && (
          <img
            src={form.thumbnail}
            alt="preview"
            className="mt-2 h-32 object-cover rounded-lg"
          />
        )}
      </div>

      <div>
        <BlogEditor
          label="Content"
          value={form.content}
          onChange={(content) =>
            setForm((prev) => ({
              ...prev,
              content,
            }))
          }
          required
        />
      </div>

      <div>
        <label className={labelClass}>Tags (comma separated)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className={inputClass}
          placeholder="nextjs, react, web..."
        />
      </div>

      <div className="border-t pt-4 space-y-4">
        <h3 className="font-medium text-gray-800">SEO Settings</h3>
        <div>
          <label className={labelClass}>Meta Title</label>
          <input
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            rows={2}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
