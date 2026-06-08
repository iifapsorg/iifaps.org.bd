"use client";
import Link from "next/link";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { categories } = useCategories();

  const parentCategories = categories.filter((c) => !c.parent);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            MyBlog
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Home</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Blog</Link>
            {parentCategories.slice(0, 4).map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Contact</Link>
            <Link href="/search" className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-3">
            <Link href="/" className="text-gray-700 text-sm font-medium px-2 py-1">Home</Link>
            <Link href="/blog" className="text-gray-700 text-sm font-medium px-2 py-1">Blog</Link>
            <Link href="/about" className="text-gray-700 text-sm font-medium px-2 py-1">About</Link>
            <Link href="/contact" className="text-gray-700 text-sm font-medium px-2 py-1">Contact</Link>
            <Link href="/search" className="text-gray-700 text-sm font-medium px-2 py-1">Search</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
