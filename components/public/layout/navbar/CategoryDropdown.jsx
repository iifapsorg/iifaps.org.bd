"use client";

import ParentCategories from "./ParentCategories";
import Container from "@/components/shared/Container";

export default function CategoryDropdown({
  isOpen,
  categoryTree = [],
  activeParent,
  onParentClick,
  pathname,
}) {
  return (
    <div
      className={`absolute top-full left-0 w-full z-40 overflow-hidden bg-background/60 shadow-2xl transition-all duration-300 ease-in-out ${
        isOpen
          ? "max-h-150 opacity-100 visible"
          : "max-h-0 opacity-0 invisible"
      }`}
    >
      <Container className="border-t border-border">
        <ParentCategories
          categories={categoryTree}
          activeParent={activeParent}
          onParentClick={onParentClick}
          pathname={pathname}
        />
      </Container>
    </div>
  );
}
