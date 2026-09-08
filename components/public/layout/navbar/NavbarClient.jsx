"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import NavbarHeader from "./NavbarHeader";
import MobileMenu from "./MobileMenu";
import CategoryDropdown from "./CategoryDropdown";
import SearchBlog from "@/components/public/blog/SearchBlog";

import { navs } from "./Navbar.config";

export default function NavbarClient({ categoryTree, pathname }) {
  const menuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);

  // 🔍 DEBUG: ব্রাউজার কনসোলে পাথ এবং টাইপ প্রিন্ট করা
  console.log("👉 CURRENT PATHNAME:", JSON.stringify(pathname), "TYPE:", typeof pathname);

  useEffect(() => {
    console.log("⚡ MOUNTED PATHNAME:", pathname);
  }, [pathname]);


  const isHome = pathname === "/";
  const isOverlayOpen = isMenuOpen || isCategoryOpen;

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setActiveParent(null);
  };

  // 1. Automatically close open menus whenever the route changes
  useEffect(() => {
    closeMenus();
  }, [pathname]);

  // 2. Handle clicks outside the navbar container to dismiss open menus
  useEffect(() => {
    if (!isOverlayOpen) return;

    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOverlayOpen]);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const toggleMenu = () => {
    setIsCategoryOpen(false);
    setActiveParent(null);
    setIsMenuOpen((prev) => !prev);
  };

  const toggleCategories = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen((prev) => !prev);
  };

  const handleParentClick = (parentId) => {
    setActiveParent((prev) => (prev === parentId ? null : parentId));
  };

  return (
    <>
      <nav
        ref={menuRef}
        aria-label="Main Navigation"
        /* 
          Corrected Class Logic:
          - Always applies top-0 left-0 z-50 w-full
          - Correctly sets absolute positioning for Home and sticky for other pages
        */
        className={`top-0 left-0 z-50 w-full transition-all duration-200 ease-in ${
          isHome
            ? `absolute ${isOverlayOpen ? "bg-black/40 shadow-lg" : "bg-transparent"}`
            : "sticky bg-background text-foreground/70 shadow-md"
        }`}
      >
        <NavbarHeader
          isHome={isHome}
          isMenuOpen={isMenuOpen}
          isCategoryOpen={isCategoryOpen}
          onMenuToggle={toggleMenu}
          onCategoryToggle={toggleCategories}
          onSearchOpen={() => setIsSearchOpen(true)}
        />

        <MobileMenu
          isOpen={isOverlayOpen && isMenuOpen}
          navs={navs}
          isActive={isActive}
        />

        <CategoryDropdown
          isOpen={isOverlayOpen && isCategoryOpen}
          categoryTree={categoryTree}
          activeParent={activeParent}
          onParentClick={handleParentClick}
          pathname={pathname}
        />
      </nav>

      {isOverlayOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMenus}
        />
      )}

      <SearchBlog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}