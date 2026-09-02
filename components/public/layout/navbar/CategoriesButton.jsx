"use client";

import { useEffect, useRef, useState } from "react";
import ParentCategories from "./ParentCategories";

export default function CategoriesButton({ categoryTree = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);

  const dropdownRef = useRef(null);

  const handleParentClick = (parentId) => {
    setActiveParent((prev) => (prev === parentId ? null : parentId));
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveParent(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveParent(null);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveParent(null);
      }}
    >
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md px-4 py-2 transition hover:bg-primary hover:text-white"
      >
        Categories
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`max-w-full overflow-hidden bg-background shadow-2xl transition-all duration-300 ease-in-out
    ${
      isOpen
        ? "max-h-[calc(100vh-120px)] overflow-y-auto opacity-100 visible"
        : "max-h-0 opacity-0 invisible"
    }
  `}
        >
          <ParentCategories
            categories={categoryTree}
            activeParent={activeParent}
            onParentClick={handleParentClick}
          />
        </div>
      )}
    </div>
  );
}
