"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function NavbarItem({ item, isActive }) {
  const [open, setOpen] = useState(false);

  const hasChildren = item.children?.length > 0;

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-start gap-3 w-full px-3 py-2.5 rounded-md hover:text-white hover:bg-gray-600 transition-colors"
          >
            <span>{item.name}</span>

            {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>

          {open && (
            <ul className="ml-4 pl-4">
              {item.children.map((child) => (
                <NavbarItem key={child.id} item={child} isActive={isActive} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex items-center px-3 py-2.5 rounded-md ${
            isActive(item.path)
              ? "text-white/90 font-bold bg-gray-600"
              : "text-foreground/70 hover:text-white/90 hover:bg-gray-600"
          }`}
        >
          {item.name}
        </Link>
      )}
    </li>
  );
}
