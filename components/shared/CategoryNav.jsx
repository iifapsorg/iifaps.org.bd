// components/shared/CategoryNav

"use client";

import Link from "next/link";
import Container from "./Container";

export default function CategoryNavb({ categories }) {
  return (
    <nav>
      <Container>
        <div>
          <ul className="flex items-center justify-center gap-6 p-4">
            {categories.map((category) => (
              <li key={category._id} className="group relative">
                {/* Category */}
                <p className="font-medium transition-colors duration-200 hover:text-blue-600">
                  {category.name}
                </p>

                {/* Hover Bridge */}
                {category.children?.length > 0 && (
                  <div className="absolute left-0 top-full h-3 w-full" />
                )}

                {/* Dropdown */}
                {category.children?.length > 0 && (
                  <div
                    className="
                    absolute left-0 top-[calc(100%+12px)] z-50 w-56
                    overflow-hidden rounded-lg border bg-black shadow-lg

                    opacity-0 invisible translate-y-2
                    pointer-events-none

                    transition-all duration-300 ease-out

                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:pointer-events-auto
                  "
                  >
                    <ul className="py-2">
                      {category.children.map((sub) => (
                        <li key={sub._id}>
                          <Link
                            href={`/category/${sub.slug}`}
                            className="
                            block px-4 py-2
                            transition-colors duration-200
                            hover:bg-gray-100
                            hover:text-blue-600
                          "
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
