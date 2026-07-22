import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ChildCategories({ children = [] }) {
  if (!children.length) {
    return (
      <div className="px-8 py-3 text-sm text-muted-foreground">
        No subcategories found.
      </div>
    );
  }

  return (
    <ul className="border-t border-border bg-muted/20">
      {children.map((child) => (
        <li key={child._id.toString()}>
          <Link
            href={`/categories/${child.slug}`}
            className="group flex items-center gap-2 px-8 py-2.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
            <span>{child.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}