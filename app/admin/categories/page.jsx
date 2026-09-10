// admin/categories/page.jsx

import Link from "next/link";
import { Suspense } from "react";
import { FolderTree } from "lucide-react";

import { getCategoryTree } from "@/services/category.service";
import Text from "@/components/shared/Text";
import Button from "@/components/shared/Button";
import AdminCategoryItem from "@/components/admin/categories/AdminCategoryItem";
import Loading from "@/app/admin/categories/loading";


export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header (Rendered instantly) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text variant="sectionHeading" className="mt-0 text-2xl md:text-3xl">
            Categories
          </Text>

          <Text variant="mediumText" className="mt-2">
            Organize your blog content with categories and subcategories.
          </Text>
        </div>

        <Link href="/admin/categories/create">
          <Button>Add New Category</Button>
        </Link>
      </div>

      {/* Dynamic Data wrapped in Suspense for non-blocking UI */}
      <Suspense fallback={<Loading />}>
        <CategoriesContent />
      </Suspense>
    </div>
  );
}

// Separate Data-Fetching Component
async function CategoriesContent() {
  // Fetch category tree directly without unnecessary array mapping
  const categories = (await getCategoryTree()) || [];

  // Compute active & inactive counts
  const activeCategories = categories.filter((cat) => cat.isActive).length;
  const inactiveCategories = categories.length - activeCategories;

  const stats = [
    {
      label: "Total Categories",
      value: categories.length,
      valueClass: "text-foreground",
    },
    {
      label: "Active",
      value: activeCategories,
      valueClass: "text-green-600",
    },
    {
      label: "Inactive",
      value: inactiveCategories,
      valueClass: "text-foreground/50",
    },
  ];

  return (
    <>
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-md border border-border bg-background p-5 shadow-sm"
          >
            <Text variant="normalText" className="text-center">
              {stat.label}
            </Text>

            <p className={`mt-2 text-2xl font-bold ${stat.valueClass}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Categories List Container */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <FolderTree className="h-4 w-4 text-foreground/70" />
          </div>

          <div>
            <Text variant="title" className="mt-0 text-base">
              All Categories
            </Text>

            <Text variant="smallText" className="mt-0.5">
              Manage your blog categories
            </Text>
          </div>
        </div>

        {/* Category Tree Item */}
        <AdminCategoryItem categories={categories} />
      </div>
    </>
  );
}
