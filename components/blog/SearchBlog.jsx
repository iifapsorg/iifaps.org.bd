"use client";

import {  useState } from "react";
import { Search, X } from "lucide-react";
import Container from "@/components/shared/Container";
import SearchResult from "./SearchResult";

export default function SearchBlog({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

// ====== handle search function ====
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/blogs/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (data.success) {
        setResults(data.blogs);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ======== main ui =========
  return (
    <div
      className={`fixed left-0 top-0 z-60 w-full bg-gray-950/95 backdrop-blur-md transition-all duration-300 ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-2 flex h-10 w-10 items-center justify-center border hover:bg-gray-800 transition cursor-pointer rounded-md"
      >
        <X size={18} />
      </button>

      <Container>
        <div className="py-20">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs..."
                className="h-14 w-full rounded-xl border border-gray-700 bg-gray-900 pl-12 pr-4 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <button
              type="submit"
              className="h-14 rounded-xl bg-indigo-600 px-6 font-medium text-white hover:bg-indigo-500 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Loading */}
          {loading && (
            <p className="mt-6 text-gray-400">Searching...</p>
          )}

          {/* Results Component */}
          {!loading && (
            <SearchResult
              results={results}
              onClose={onClose}
            />
          )}

          {/* No results */}
          {!loading && query && results.length === 0 && (
            <p className="mt-6 text-gray-500">No results found</p>
          )}
        </div>
      </Container>
    </div>
  );
}