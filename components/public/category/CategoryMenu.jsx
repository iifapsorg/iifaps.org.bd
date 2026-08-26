// components/categiry/categorymenu

import Link from "next/link";

export default function CategoryMenu({ categories = [], activeSlug }) {
  const parents = categories.filter((c) => !c.parent);
  console.log(parents);
  

  return (
    <nav className="flex flex-wrap gap-3">
      {parents.map((cat) => (
        <Link
          key={cat._id}
          href={`/category/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSlug === cat.slug
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
