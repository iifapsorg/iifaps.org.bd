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
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-md hover:bg-gray-600 transition-colors"
          >
            <span>{item.name}</span>

            {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {open && (
            <ul className="ml-4 border-l border-gray-700 pl-3">
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
              ? "text-foreground/90 font-bold bg-gray-600"
              : "text-foreground/70 hover:text-foreground/90 hover:bg-gray-600"
          }`}
        >
          {item.name}
        </Link>
      )}
    </li>
  );
}
