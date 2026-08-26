// components/blog/pagination

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import GridLoader from "react-spinners/GridLoader";

export default function Pagination({ pages, currentPage, currentType }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  // === handlePageChange function ====
  const handlePageChange = (page) => {
    if (page === currentPage) return;

    startTransition(() => {
      router.push(`/blogs?type=${currentType}&page=${page}`);
    });
  };

  return (
    <>
      {/* ==== loading ui / spinner ==== */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
          <GridLoader color="#4B5563" size={22} />
        </div>
      )}

      {/* ====== main pagination ui ====== */}
      <div className="mt-10 flex justify-center gap-4">
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg text-sm text-foreground font-medium border border-border transition-colors disabled:cursor-not-allowed
      ${
        p === currentPage
          ? "bg-gray-700 text-white cursor-not-allowed"
          : "hover:text-white hover:bg-gray-800 cursor-pointer"
      }
    `}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
}
