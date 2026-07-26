"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

import NavbarItem from "./NavbarItem";
import CategoryDropdown from "./CategoryDropdown";

import Container from "@/components/shared/Container";
import { navs } from "@/components/layout/navbar/Navbar.config";
import SearchBlog from "@/components/blog/SearchBlog";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";
import logo from "@/public/images/IIFAPS-logo.webp";
import Text from "@/components/shared/Text";

export default function NavbarClient({ categoryTree }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);

  const pathname = usePathname();
  const menuRef = useRef(null);

  // ==========================
  // Parent Category Toggle
  // ==========================
  const handleParentClick = (parentId) => {
    setActiveParent((prev) => (prev === parentId ? null : parentId));
  };

  // ==========================
  // Active Route Helper
  // ==========================
  const isActive = (path) => {
    if (path === "/") return pathname === "/";

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // ==========================
  // Close menus on route change
  // ==========================
  useEffect(() => {
    setIsOpen(false);
    setIsCategoryOpen(false);
    setActiveParent(null);
  }, [pathname]);

  // ==========================
  // Close menus on outside click
  // ==========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsCategoryOpen(false);
        setActiveParent(null);
      }
    };

    if (isOpen || isCategoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isCategoryOpen]);

  // ==========================
  // Prevent body scroll
  // ==========================
  useEffect(() => {
    const shouldLock = isOpen || isCategoryOpen;

    document.body.classList.toggle("overflow-hidden", shouldLock);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, isCategoryOpen]);

  return (
    <>
      {/* ========================== */}
      {/* Navbar */}
      {/* ========================== */}
      <nav
        ref={menuRef}
        className="sticky top-0 z-50 bg-background shadow-lg"
        aria-label="Main Navigation"
      >
        <Container>
          <div className="flex items-center justify-between w-full py-2">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <Link href="/" className="shrink-0">
                <Image
                  src={logo}
                  alt="IIFAPS Logo"
                  width={40}
                  height={40}
                  priority
                />
              </Link>

              <Link href="/">
                <Text
                  variant="normalText"
                  className="md:w-70 leading-tight text-[10px] sm:text-xs md:text-sm lg:text-base text-foreground"
                >
                  INTERNATIONAL INSTITUTE FOR ADVANCED POLITICAL STUDIES
                </Text>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3 ml-3 shrink-0">

              {/* Categories */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsCategoryOpen((prev) => !prev);
                }}
                className="flex h-10 items-center rounded-md border px-4 transition hover:bg-gray-800 hover:text-white"
              >
                Categories
              </button>

              <ThemeToggle />

              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open Search"
                className="flex h-10 w-10 items-center justify-center rounded-md border transition hover:bg-gray-800 hover:text-white"
              >
                <Search size={18} />
              </button>

              {/* Menu */}
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(false);
                  setActiveParent(null);
                  setIsOpen((prev) => !prev);
                }}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center rounded-md border transition hover:bg-gray-800 hover:text-white"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>

        {/* ========================== */}
        {/* Mobile Menu */}
        {/* ========================== */}
        <div
          id="mobile-menu"
          className={`absolute top-full left-0 w-full
          max-h-[calc(100vh-120px)]
          overflow-y-auto
          bg-background/60
          shadow-2xl
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-2 opacity-0 invisible"
          }`}
        >
          <ul className="flex flex-col gap-1 border-t border-gray-800 px-4 py-4">
            {navs.map((nav) => (
              <NavbarItem
                key={nav.id}
                item={nav}
                isActive={isActive}
              />
            ))}
          </ul>
        </div>

        {/* ========================== */}
        {/* Category Dropdown */}
        {/* ========================== */}
        <CategoryDropdown
          isOpen={isCategoryOpen}
          categoryTree={categoryTree}
          activeParent={activeParent}
          onParentClick={handleParentClick}
          pathname={pathname}
        />
      </nav>

      {/* ========================== */}
      {/* Shared Backdrop */}
      {/* ========================== */}
      {(isOpen || isCategoryOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            setIsCategoryOpen(false);
            setActiveParent(null);
          }}
        />
      )}

      {/* ========================== */}
      {/* Search */}
      {/* ========================== */}
      <SearchBlog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
