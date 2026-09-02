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
      className={`absolute top-full left-0 w-full  bg-background/60 shadow-2xl transition-all duration-300 ease-in-out ${
        isOpen
          ? "max-h-[calc(100vh-80px)] opacity-100 visible overflow-y-auto"
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
