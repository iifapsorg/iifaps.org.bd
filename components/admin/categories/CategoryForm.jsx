// components/admin/categoryform

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../shared/Button";

export default function CategoryForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    parent: initialData?.parent || "",
    name: initialData?.name || "",
    isActive: initialData?.isActive ?? true,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) =>
        setCategories(
          (d.categories || []).filter((c) => c._id !== initialData?._id),
        ),
      );
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...form, parent: form.parent || null };
      const url = isEdit
        ? `/api/categories/${initialData._id}`
        : "/api/categories";
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

  const inputClass =
    "w-full px-3 py-2 border border-border rounded-md text-md focus:outline-none focus:ring-1 focus:ring-blue-200";
  const labelClass = "block text-md font-medium text-gray-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-180">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="mt-5 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ======== category ====== */}
        {isEdit || (
          <div>
            <label className={labelClass}>Select Category (optional)</label>
            <select
              name="parent"
              value={form.parent}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">None</option>
              {categories
                .filter((c) => !c.parent)
                .map((c) => (
                  <option className={inputClass} key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* ======== Sub category ====== */}
        <div>
          <label className={labelClass}>
            Category Name <span className="text-red-600">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Type Category or Sub Category Name..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="rounded"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">
          Active Categroy
        </label>
      </div>

      <div className="flex gap-3 pt-3">
        <Button type="submit" variant="success">
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Category"
              : "Create Category"}
        </Button>

        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
