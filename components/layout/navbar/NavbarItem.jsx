//components/layout/navbar/NavbarItem.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Minus, Plus } from "lucide-react";

export default function NavbarItem({ item, isActive, isChild = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = Boolean(item.children?.length);

  const itemClass = `
    flex w-full items-center px-3 py-2.5
    transition-colors
    hover:bg-gray-600 hover:text-white
  `;

  if (!hasChildren) {
    return (
      <li className="border-b border-border last:border-none">
        <Link
          href={item.path}
          className={`${itemClass} group gap-2 ${
            isActive(item.path)
              ? "bg-gray-600 font-bold text-white/90"
              : "text-foreground/70"
          }`}
        >
          {isChild && (
            <ChevronRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          )}

          <span>{item.name}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-border last:border-none">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`${itemClass} justify-between text-left`}
      >
        <span className="flex items-center gap-2">
          {isChild && <ChevronRight size={16} />}
          {item.name}
        </span>

        {isOpen ? <Minus size={22} /> : <Plus size={22} />}
      </button>

      {isOpen && (
        <ul className="ml-4">
          {item.children.map((child) => (
            <NavbarItem
              key={child._id || child.id}
              item={child}
              isActive={isActive}
              isChild
            />
          ))}
        </ul>
      )}
    </li>
  );
}