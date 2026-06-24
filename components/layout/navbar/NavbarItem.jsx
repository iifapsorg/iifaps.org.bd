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
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-gray-300 hover:text-indigo-400 hover:bg-gray-800 transition-colors"
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
              ? "text-indigo-400 bg-indigo-400/10"
              : "text-gray-300 hover:text-indigo-400 hover:bg-gray-800"
          }`}
        >
          {item.name}
        </Link>
      )}
    </li>
  );
}
