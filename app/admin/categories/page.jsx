// /admin/categories/page

import Link from "next/link";
import { getAllCategories } from "@/services/category.service";

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {

  const categories = await getAllCategories();

  const parentMap = {};
  categories.forEach((c) => (parentMap[c._id?.toString()] = c.name));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Link
          href="/admin/categories/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + New Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Slug</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Parent</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{cat.slug}</td>
                <td className="px-6 py-4 text-gray-500">
                  {cat.parent ? parentMap[cat.parent?.toString()] || "—" : <span className="text-xs text-blue-500 font-medium">Top-level</span>}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${cat.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/categories/edit/${cat._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!categories.length && (
          <div className="text-center py-12 text-gray-400">
            No categories yet.{" "}
            <Link href="/admin/categories/create" className="text-blue-600">Create one.</Link>
          </div>
        )}
      </div>
    </div>
  );
}
