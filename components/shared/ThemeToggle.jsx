// components/shared/ThemeToggle

"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isHome = pathname === "/";

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`flex h-10 w-10 items-center justify-center rounded-md border transition
        hover:bg-gray-800 hover:text-white
        ${isHome ? "text-white" : ""}
      `}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}