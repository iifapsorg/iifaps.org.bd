// components/layout/NavbarClient.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import NavbarHeader from "./NavbarHeader";
import MobileMenu from "./MobileMenu";
import CategoryDropdown from "./CategoryDropdown";
import SearchBlog from "@/components/public/blog/SearchBlog";

import { navs } from "./Navbar.config";

export default function NavbarClient({ categoryTree }) {
  const pathname = usePathname();
  const menuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);

  const isHome = pathname === "/";

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setActiveParent(null);
  };

  /*
   * Route-aware overlay state.
   *
   * If navigation happens while a menu is open,
   * the old state remains internally, but it won't be
   * displayed on the new pathname.
   */
  const [menuPathname, setMenuPathname] = useState(pathname);

  const isOverlayOpen =
    menuPathname === pathname && (isMenuOpen || isCategoryOpen);

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
    setMenuPathname(pathname);
    setIsCategoryOpen(false);
    setActiveParent(null);
    setIsMenuOpen((prev) => !prev);
  };

  const toggleCategories = () => {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
    setIsCategoryOpen((prev) => !prev);
  };

  const handleParentClick = (parentId) => {
    setActiveParent((prev) =>
      prev === parentId ? null : parentId
    );
  };

  return (
    <>
      <nav
        ref={menuRef}
        aria-label="Main Navigation"
        className={`absolute top-0 left-0 z-50 w-full transition-all duration-200 ease-in
          ${
            isHome
              ? isOverlayOpen
                ? "bg-black/40 shadow-lg"
                : "bg-transparent"
              : "bg-transparent shadow-lg"
          }
        `}
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
          className="fixed inset-0 z-40 bg-transparent/60 backdrop-blur-sm"
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