import { Menu, Search, X } from "lucide-react";

import ThemeToggle from "@/components/shared/ThemeToggle";
// import { useNavigation } from "@/components/providers/NavigationProvider";

export default function NavbarActions({
  // isHome,
  isMenuOpen,
  isCategoryOpen,
  onMenuToggle,
  onCategoryToggle,
  onSearchOpen,
}) {
  // const pathname = usePathname();
  // const isHome = pathname === "/";
  // const { isHome } = useNavigation();
  // const textColor = isHome && "text-white";

  return (
    <div className="ml-3 flex shrink-0 items-center gap-2 md:gap-3">
      <button
        type="button"
        onClick={onCategoryToggle}
        className={`
          flex h-10 items-center rounded-md
          border border-border px-4
          transition
          hover:bg-gray-800 hover:text-white`}
      >
        Categories
      </button>

      <ThemeToggle />

      <button
        type="button"
        onClick={onSearchOpen}
        aria-label="Open Search"
        className={`
          flex h-10 w-10 items-center justify-center
          rounded-md border
          transition
          hover:bg-gray-800 hover:text-white`}
      >
        <Search size={18} />
      </button>

      <button
        type="button"
        onClick={onMenuToggle}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className={`
          flex h-10 w-10 items-center justify-center
          rounded-md border
          transition
          hover:bg-gray-800 hover:text-white`}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  );
}
