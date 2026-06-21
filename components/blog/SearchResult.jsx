import Link from "next/link";

export default function SearchResult({ results, onClose }) {
  if (!results.length) return null;

  return (
    <div className="mt-6 space-y-3">
      {results.map((blog) => (
        <Link
          key={blog._id}
          href={`/blogs/${blog.slug}`}
          onClick={onClose}
          className="block rounded-lg border border-gray-800 bg-gray-900 p-4 transition hover:bg-gray-800"
        >
          <h3 className="text-white font-medium">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-400">
            {blog.excerpt}
          </p>
        </Link>
      ))}
    </div>
  );
}