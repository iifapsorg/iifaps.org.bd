import Link from "next/link";

export default function SubCategoryMenu({ parentSlug, subcategories = [], activeSlug }) {
  if (!subcategories.length) return null;

  return (
    <nav className="flex flex-wrap gap-2 mt-3">
      {subcategories.map((sub) => (
        <Link
          key={sub._id}
          href={`/category/${parentSlug}/${sub.slug}`}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
            activeSlug === sub.slug
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          {sub.name}
        </Link>
      ))}
    </nav>
  );
}
