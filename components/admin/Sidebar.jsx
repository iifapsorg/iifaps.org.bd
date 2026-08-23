// components/admin/sidebar/Sidebar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Globe, LogOut, Zap } from "lucide-react";

import { sidebarItems } from "@/config/admin/sidebar/sidebar.config";

function NavItem({ item, pathname }) {
  const Icon = item.icon;

  const isActive =
    pathname === item.href ||
    (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-md px-5 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-gray-600 text-white shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
      <span className="whitespace-nowrap">{item.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin" });
  };

  return (
    <aside className="w-full border-b border-border shadow-sm lg:h-full lg:border-r lg:border-b-0 lg:shadow-md">
      <div className="flex h-full flex-col p-3 lg:p-4">
        {/* Logo */}
        <Link
          href="/admin"
          className="mb-4 hidden lg:flex items-center gap-2.5 rounded-md p-2 hover:bg-muted lg:mb-6"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-600 text-white shadow-sm">
            <Zap size={19} />
          </span>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Admin Panel
            </p>
            <p className="text-xs text-muted-foreground">Management</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="py-2 flex flex-wrap justify-center gap-1.5 lg:flex-col lg:overflow-visible"
        >
          {sidebarItems.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden mt-20 space-y-1 border-t border-border pt-4 lg:block">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Globe size={18} />
            <span>View Site</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-500 hover:text-foreground"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}




