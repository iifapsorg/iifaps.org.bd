"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

  // ১. নিরাপদ isHome চেক (SSR/Null Safety সহ)
  const isHome = pathname ? pathname === "/" : true;
  const isOverlayOpen = isMenuOpen || isCategoryOpen;

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setActiveParent(null);
  }, []);

  // ২. রাউট চেঞ্জ হলে মেনু বন্ধ
  useEffect(() => {
    closeMenus();
  }, [pathname, closeMenus]);

  // ৩. মেনু খোলা থাকলে ব্যাকগ্রাউন্ড স্ক্রোল লক করা
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOverlayOpen]);

  // ৪. বাইরে ক্লিক করলে মেনু বন্ধ
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
  }, [isOverlayOpen, closeMenus]);

  const isActive = (path) => {
    if (!pathname) return false;
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

  // ৫. স্টাইল ক্লাসগুলোকে সম্পূর্ণ পৃথক করে দেওয়া
  const navClasses =`relative top-0 left-0 z-50 w-full transition-all duration-300 bg-background text-muted-foreground}`;

  return (
    <>
      <nav ref={menuRef} aria-label="Main Navigation" className={navClasses}>
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
          pathname={pathname || "/"}
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