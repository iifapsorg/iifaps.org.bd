"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import NavbarHeader from "./NavbarHeader";
import MobileMenu from "./MobileMenu";
import CategoryDropdown from "./CategoryDropdown";
import SearchBlog from "@/components/public/blog/SearchBlog";

import { navs } from "./Navbar.config";

export default function NavbarClient({ categoryTree, pathname: propPathname }) {
  const routerPathname = usePathname();
  const menuRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);

  // ১. ক্লায়েন্ট মাউন্ট ট্র্যাকিং
  useEffect(() => {
    setMounted(true);
  }, []);

  // ২. পাথনেম নির্বাচন (Router/Prop/Window Fallback)
  const currentPath = routerPathname || propPathname;
  
  const activePath = mounted
    ? currentPath
    : typeof window !== "undefined"
      ? window.location.pathname
      : currentPath;

  // ৩. ফিক্সড isHome চেক
  const isHome = activePath === "/";
  const isOverlayOpen = isMenuOpen || isCategoryOpen;

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setActiveParent(null);
  };

  // ৪. রাউট চেঞ্জ হলে মেনু বন্ধ করা
  useEffect(() => {
    closeMenus();
  }, [activePath]);

  // ৫. বাইরে ক্লিক করলে মেনু বন্ধ করা
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
      return activePath === "/";
    }
    return activePath === path || activePath?.startsWith(`${path}/`);
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
          pathname={activePath}
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