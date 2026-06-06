"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function CategoryForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = !!initialData;
  // const router = useRouter();

  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    thumbnail: initialData?.thumbnail || "",
    parent: initialData?.parent || "",
    isActive: initialData?.isActive ?? true,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories((d.categories || []).filter((c) => c._id !== initialData?._id)));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      setForm((prev) => ({ ...prev, thumbnail: data.url }));
    } catch {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...form, parent: form.parent || null };
      const url = isEdit ? `/api/categories/${initialData._id}` : "/api/categories";
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
      router.refresh();
      router.push("/admin/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

      <div>
        <label className={labelClass}>Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Category name..." />
      </div>

      <div>
        <label className={labelClass}>Parent Category (optional)</label>
        <select name="parent" value={form.parent} onChange={handleChange} className={inputClass}>
          <option value="">None (Top-level)</option>
          {categories.filter((c) => !c.parent).map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Thumbnail</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-500" />
        {uploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
        {form.thumbnail && <img src={form.thumbnail} alt="preview" className="mt-2 h-28 object-cover rounded-lg" />}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleChange} className="rounded" />
        <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
