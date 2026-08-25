"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteCategoryButton = ({ categoryId, categoryName }) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!categoryId || isDeleting) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${categoryName}"?\n\nThis category will be moved to the deleted state.`,
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        // Ignore non-JSON response
      }

      if (!response.ok) {
        throw new Error(
          data?.error || data?.message || "Failed to delete category.",
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Delete category error:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the category.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`Delete ${categoryName}`}
      title={`Delete ${categoryName}`}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-md
        px-3
        py-1.5
        text-sm
        outline
        outline-border
        transition-colors
        duration-200
        hover:bg-red-800
        hover:text-white
        hover:outline-transparent
        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {isDeleting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      )}

      <span className="hidden lg:inline">
        {isDeleting ? "Deleting..." : "Delete"}
      </span>
    </button>
  );
};

export default DeleteCategoryButton;
