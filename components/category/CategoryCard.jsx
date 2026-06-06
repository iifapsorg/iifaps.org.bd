import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category, parentSlug }) {
  const href = parentSlug
    ? `/category/${parentSlug}/${category.slug}`
    : `/category/${category.slug}`;

  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {category.thumbnail && (
        <div className="relative h-32 overflow-hidden">
          <Image
            src={category.thumbnail}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
