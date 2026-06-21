"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

import Container from "@/components/shared/Container";
import { navs } from "@/components/layout/navbar/Navbar.config";
import SearchBlog from "@/components/blog/SearchBlog";
import Image from "next/image";
import logo from "@/public/IIFAPS-logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  // ======== Active route helper =======
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // ======= Close mobile menu on route change =======
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ======= Close mobile menu on outside click ========
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

  // ==== Prevent body scroll ===========
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // ====== desktop nav items class ======
  const desktopLinkClass = (path) =>
    `px-3 py-1.5 rounded block font-medium transition-colors duration-300 ${
      isActive(path)
        ? "text-indigo-400 outline outline-foreground"
        : "text-gray-300 hover:text-indigo-400 hover:outline hover:outline-foreground"
    }`;

  // ====== mobile nav items class =====
  const mobileLinkClass = (path) =>
    `block px-3 py-2.5 rounded-md font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-indigo-400 bg-indigo-400/10"
        : "text-gray-300 hover:text-indigo-400 hover:bg-gray-800"
    }`;

  // ========== main UI ============
  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 bg-gray-950 text-gray-200 shadow-lg"
      aria-label="Main Navigation"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* ======= Logo ======= */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-wide text-white transition-colors duration-300 hover:text-indigo-400"
          >
            <Image src={logo} alt="logo here" width={40} height={40} />
          </Link>

          {/* ========== Desktop Menu ======== */}
          <ul className="hidden md:flex items-center gap-8 ">
            {navs.map((nav) => (
              <li key={nav.id}>
                <Link
                  href={nav.path}
                  className={desktopLinkClass(nav.path)}
                  aria-current={isActive(nav.path) ? "page" : undefined}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* ========== search and mobile toggole menu ======== */}
          <div className="flex gap-x-5">
            {/* ====== search here ======*/}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search"
              className="rounded-md p-2 text-gray-300 transition hover:text-white hover:bg-gray-800 cursor-pointer"
            >
              <Search size={22} />
            </button>

            {/* ======= Mobile Toggle ======== */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="cursor-pointer rounded-md p-2 text-gray-300 transition-colors hover:text-white hover:bg-gray-800 focus:outline-none  md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* ======== Search Panel ======== */}
      <SearchBlog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ========= Mobile Menu ======== */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-gray-800 bg-gray-900 px-4 py-4">
          {navs.map((nav) => (
            <li key={nav.id}>
              <Link
                href={nav.path}
                className={mobileLinkClass(nav.path)}
                aria-current={isActive(nav.path) ? "page" : undefined}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
