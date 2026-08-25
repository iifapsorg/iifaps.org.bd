// admin/categories/page
import Link from "next/link";
import { FolderTree } from "lucide-react";
import { getCategoryTree } from "@/services/category.service";
import Text from "@/components/shared/Text";
import Button from "@/components/shared/Button";
import AdminCategoryItem from "@/components/admin/AdminCategoryItem";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categoryTree = await getCategoryTree();

  const categories = categoryTree?.map((category) => category);


  const parentMap = {};

  categories.forEach((category) => {
    parentMap[category._id?.toString()] = category.name;
  });

  const activeCategories = categories.filter(
    (category) => category.isActive,
  ).length;

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
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats?.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md flex flex-col items-center justify-center border border-border bg-background p-5 shadow-sm"
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

      {/* Categories part */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        {/* Category Header */}
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

        {/* ====== category item ===== */}
        <AdminCategoryItem categories={categories} />
      </div>
    </div>
  );
}
