// components/admin/sidebar

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "🏠" },
  { label: "Blogs", href: "/admin/blogs", icon: "📝" },
  { label: "Categories", href: "/admin/categories", icon: "🗂️" },
  { label: "Users", href: "/admin/users", icon: "👥" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          ⚡ Admin Panel
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-3 transition-colors">
          🌐 View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}
