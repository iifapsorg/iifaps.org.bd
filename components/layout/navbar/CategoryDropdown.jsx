"use client";

import ParentCategories from "./ParentCategories";

export default function CategoryDropdown({
  isOpen,
  categoryTree = [],
  activeParent,
  onParentClick,
}) {
  return (
    <div
      className={`
        absolute
        top-full
        left-0
        w-full
        z-40
        overflow-hidden
        bg-background
        shadow-2xl
        transition-all
        duration-300
        ease-in-out
        ${
          isOpen
            ? "max-h-150 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }
      `}
    >
      <div className="border-t border-border">
        <ParentCategories
          categories={categoryTree}
          activeParent={activeParent}
          onParentClick={onParentClick}
        />
      </div>
    </div>
  );
}