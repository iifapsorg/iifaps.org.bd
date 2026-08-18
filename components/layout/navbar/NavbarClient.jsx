// components/layout/NavbarClient.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";

import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import ThemeToggle from "@/components/shared/ThemeToggle";
import SearchBlog from "@/components/blog/SearchBlog";

import NavbarItem from "./NavbarItem";
import CategoryDropdown from "./CategoryDropdown";
import { navs } from "./Navbar.config";

import logo from "@/public/images/IIFAPS-logo.webp";

export default function NavbarClient({ categoryTree }) {
  const pathname = usePathname();
  const menuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";

  /* =========================
     Navbar Scroll
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     Close All Menus
  ========================= */
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
    setActiveParent(null);
  };

  /* =========================
     Route Change
  ========================= */
  useEffect(() => {
    closeMenus();
  }, [pathname]);

  /* =========================
     Outside Click
  ========================= */
  useEffect(() => {
    if (!isMenuOpen && !isCategoryOpen) return;

    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isCategoryOpen]);

  /* =========================
     Active Route
  ========================= */
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /* =========================
     Menu Toggle
  ========================= */
  const toggleMenu = () => {
    setIsCategoryOpen(false);
    setActiveParent(null);
    setIsMenuOpen((prev) => !prev);
  };

  /* =========================
     Category Toggle
  ========================= */
  const toggleCategories = () => {
    setIsMenuOpen(false);
    setIsCategoryOpen((prev) => !prev);
  };

  /* =========================
     Parent Category
  ========================= */
  const handleParentClick = (parentId) => {
    setActiveParent((prev) => (prev === parentId ? null : parentId));
  };

  return (
    <>
      {/* =========================
          Navbar
      ========================= */}
      <nav
        ref={menuRef}
        aria-label="Main Navigation"
        className={`
          z-50 w-full
          transition-all duration-200 ease-in
          ${
            isHome
              ? isScrolled
                ? "fixed top-0 left-0 bg-background shadow-lg"
                : isMenuOpen || isCategoryOpen
                  ? "absolute top-0 left-0 bg-background shadow-lg"
                  : "absolute top-0 left-0 bg-transparent"
              : "sticky top-0 bg-background shadow-lg"
          }
        `}
      >
        {/* =========================
            Header
        ========================= */}
        <Container>
          <div className="flex w-full items-center justify-between py-2">
            {/* Logo */}
            <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
              <Link href="/" className="shrink-0">
                <Image
                  src={logo}
                  alt="IIFAPS Logo"
                  width={40}
                  height={40}
                  priority
                />
              </Link>

              <Link href="/" className="min-w-0">
                <Text
                  variant="normalText"
                  className="
                    leading-tight
                    text-[10px]
                    text-foreground
                    sm:text-xs
                    md:w-70
                    md:text-sm
                    lg:text-base
                  "
                >
                  INTERNATIONAL INSTITUTE FOR ADVANCED POLITICAL STUDIES
                </Text>
              </Link>
            </div>

            {/* Actions */}
            <div className="ml-3 flex shrink-0 items-center gap-2 md:gap-3">
              {/* Categories */}
              <button
                type="button"
                onClick={toggleCategories}
                className="
                  flex h-10 items-center rounded-md border px-4
                  transition
                  hover:bg-gray-800 hover:text-white
                "
              >
                Categories
              </button>

              {/* Theme */}
              <ThemeToggle />

              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open Search"
                className="
                  flex h-10 w-10 items-center justify-center rounded-md border
                  transition
                  hover:bg-gray-800 hover:text-white
                "
              >
                <Search size={18} />
              </button>

              {/* Menu */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="
                  flex h-10 w-10 items-center justify-center rounded-md border
                  transition
                  hover:bg-gray-800 hover:text-white
                "
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>

        {/* =========================
            Mobile Menu
        ========================= */}
        <div
          id="mobile-menu"
          className={`
            absolute top-full left-0 w-full
            max-h-[calc(100vh-120px)]
            overflow-y-auto
            bg-background/60
            shadow-2xl
            transition-all duration-300 ease-in-out
            ${
              isMenuOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
            }
          `}
        >
          <Container>
            <ul className="flex flex-col py-4">
              {navs.map((nav) => (
                <NavbarItem
                  key={nav.id}
                  item={nav}
                  isActive={isActive}
                />
              ))}
            </ul>
          </Container>
        </div>

        {/* =========================
            Category Dropdown
        ========================= */}
        <CategoryDropdown
          isOpen={isCategoryOpen}
          categoryTree={categoryTree}
          activeParent={activeParent}
          onParentClick={handleParentClick}
          pathname={pathname}
        />
      </nav>

      {/* =========================
          Backdrop
      ========================= */}
      {(isMenuOpen || isCategoryOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={closeMenus}
        />
      )}

      {/* =========================
          Search
      ========================= */}
      <SearchBlog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}