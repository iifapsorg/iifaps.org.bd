"use client";

import { useMemo, useState } from "react";
import { FolderTree } from "lucide-react";

import Text from "@/components/shared/Text";
import AdminCategoryItem from "@/components/admin/categories/AdminCategoryItem";

const FILTERS = {
  TOTAL: "total",
  ACTIVE: "active",
  INACTIVE: "inactive",
};

// Checks whether a category matches the selected filter.
function matchesFilter(category, filter) {
  if (filter === FILTERS.TOTAL) return true;

  return filter === FILTERS.ACTIVE
    ? category.isActive === true
    : category.isActive === false;
}

// Calculates counts for parent categories only.
function getCategoryCounts(categories) {
  const total = categories.length;
  const active = categories.filter(
    (category) => category.isActive === true,
  ).length;

  return {
    total,
    active,
    inactive: total - active,
  };
}

// Filters parent categories while preserving their subcategories.
function filterCategoryGroups(categories, filter) {
  return categories
    .filter((category) => matchesFilter(category, filter))
    .map((category) => ({
      ...category,
      children: category.children || [],
    }));
}

// Manages category filters, counts, and the category list.
export default function CategoryManagement({ categories = [] }) {
  const [filter, setFilter] = useState(FILTERS.ACTIVE);

  const counts = useMemo(() => getCategoryCounts(categories), [categories]);

  const filteredCategories = useMemo(
    () => filterCategoryGroups(categories, filter),
    [categories, filter],
  );

  const stats = [
    {
      key: FILTERS.TOTAL,
      label: "Total Categories",
      value: counts.total,
      valueClass: "text-foreground",
    },
    {
      key: FILTERS.ACTIVE,
      label: "Active",
      value: counts.active,
      valueClass: "text-green-600",
    },
    {
      key: FILTERS.INACTIVE,
      label: "Inactive",
      value: counts.inactive,
      valueClass: "text-foreground/50",
    },
  ];

  const title = {
    [FILTERS.TOTAL]: "All Categories",
    [FILTERS.ACTIVE]: "Active Categories",
    [FILTERS.INACTIVE]: "Inactive Categories",
  }[filter];

  return (
    <>
      {/* Category status filters */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const isSelected = filter === stat.key;

          return (
            <button
              key={stat.key}
              type="button"
              onClick={() => setFilter(stat.key)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center rounded-md border p-5 text-center shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:bg-muted/50"
              }`}
            >
              <Text variant="normalText" className="text-center">
                {stat.label}
              </Text>

              <p className={`mt-2 text-2xl font-bold ${stat.valueClass}`}>
                {stat.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filtered category list */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <FolderTree className="h-4 w-4 text-foreground/70" />
          </div>

          <div>
            <Text variant="title" className="mt-0 text-base">
              {title}
            </Text>

            <Text variant="smallText" className="mt-0.5">
              {counts[filter]} categories
            </Text>
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <AdminCategoryItem key={filter} categories={filteredCategories} />
        ) : (
          <div className="px-5 py-12 text-center">
            <Text variant="mediumText">
              No{" "}
              {filter === FILTERS.ACTIVE
                ? "active"
                : filter === FILTERS.INACTIVE
                  ? "inactive"
                  : ""}{" "}
              categories found.
            </Text>
          </div>
        )}
      </div>
    </>
  );
}
