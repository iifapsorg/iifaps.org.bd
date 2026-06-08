import Link from "next/link";
import { getAllBlogs } from "@/services/blog.service";
import { formatShortDate } from "@/utils/formatDate";
// import { useRouter } from "next/router";

export default async function AdminBlogsPage() {
  // const router = useRouter();
  //   if (router.isFallback) {
  //   return <div>Loading...</div>
  // }
  const { blogs } = await getAllBlogs({ limit: 50, status: "published" });
  const { blogs: drafts } = await getAllBlogs({ limit: 50, status: "draft" });
  const allBlogs = [...blogs, ...drafts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
        <Link
          href="/admin/blogs/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + New Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Title
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Category
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {allBlogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                  {blog.title}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {blog.category?.name || "—"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${blog.status === "published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {formatShortDate(blog.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/blogs/edit/${blog._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!allBlogs.length && (
          <div className="text-center py-12 text-gray-400">
            No blogs yet.{" "}
            <Link href="/admin/blogs/create" className="text-blue-600">
              Create one.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
