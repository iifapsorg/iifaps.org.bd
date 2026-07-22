"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import ChildCategories from "./ChildCategories";

export default function ParentCategories({
  categories = [],
  activeParent,
  onParentClick,
}) {
  return (
    <ul className="py-2 z-3">
      {categories.map((parent) => {
        const isOpen = activeParent === parent._id.toString();

        return (
          <li
            key={parent._id.toString()}
            className="border-b border-border last:border-none"
          >
            {/* Parent Button */}
            <button
              type="button"
              onClick={() => onParentClick(parent._id.toString())}
              className="
                flex
                w-full
                items-center
                justify-between
                px-4
                py-3
                text-left
                transition-colors
                hover:bg-muted
              "
            >
              <span className="font-medium">
                {parent.name}
              </span>

              {isOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            {/* Child Categories */}
            {isOpen && (
              <ChildCategories
                children={parent.children || []}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}