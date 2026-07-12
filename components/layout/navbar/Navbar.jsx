"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import NavbarItem from "./NavbarItem";

import Container from "@/components/shared/Container";
import { navs } from "@/components/layout/navbar/Navbar.config";
import SearchBlog from "@/components/blog/SearchBlog";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";
import logo from "@/public/images/IIFAPS-logo.webp";
import Text from "@/components/shared/Text";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const menuRef = useRef(null);

  // ======== Active route helper ========
  const isActive = (path) => {
    if (path === "/") return pathname === "/";

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // ======== Close menu on route change ========
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ======== Close menu on outside click ========
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ======== Prevent body scroll ========
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* ======== Navbar ======== */}
      <nav
        ref={menuRef}
        className="sticky top-0 z-50 bg-background shadow-lg"
        aria-label="Main Navigation"
      >
        <Container>
          <div className="flex items-center justify-between w-full py-2">
            {/* ======== Logo & Name ======== */}
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

              <Text
                variant="normalText"
                className="md:w-70 leading-tight text-[10px] sm:text-xs md:text-sm lg:text-base text-foreground"
              >
                <Link href ="/">INTERNATIONAL INSTITUTE FOR ADVANCED POLITICAL STUDIES</Link>
              </Text>
            </div>

            {/* ======== Actions ======== */}
            <div className="flex items-center gap-2 md:gap-3 ml-3 shrink-0">
              <ThemeToggle />

              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open Search"
                className="flex h-10 w-10 items-center justify-center rounded-md border transition hover:bg-gray-800 hover:text-white cursor-pointer"
              >
                <Search size={18} />
              </button>

              {/* Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center rounded-md border transition hover:bg-gray-800 hover:text-white cursor-pointer"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>

        {/* ======== Dropdown Menu ======== */}
        <div
          id="mobile-menu"
          className={`absolute top-full left-0 w-full z-999
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
              <NavbarItem key={nav.id} item={nav} isActive={isActive} />
            ))}
          </ul>
        </div>
      </nav>

      {/* ======== Backdrop ======== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ======== Search Panel ======== */}
      <SearchBlog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
