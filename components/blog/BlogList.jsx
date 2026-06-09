// components/blog/bloglist

import BlogCard from "./BlogCard";

export default function BlogList({ blogs = [] }) {
  if (!blogs.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
