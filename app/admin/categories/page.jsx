// admin/categories/page
import Link from "next/link";
import { Plus, FolderTree, Pencil, Layers3 } from "lucide-react";
import { getAllCategories } from "@/services/category.service";
import Text from "@/components/shared/Text";
import { cn } from "@/utils/cn";
import Button from "@/components/shared/Button";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

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

      {/* Categories Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        {/* Table Header */}
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

        {categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5 text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Name
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Slug
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Parent Category
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {categories.map((category) => {
                  const parentName = category.parent
                    ? parentMap[category.parent?.toString()]
                    : null;

                  return (
                    <tr
                      key={category._id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Layers3 className="h-4 w-4 text-foreground/50" />
                          </div>

                          <div>
                            <p className="font-medium text-foreground">
                              {category.name}
                            </p>

                            {!category.parent && (
                              <p className="mt-0.5 text-xs text-foreground/40 bg-muted rounded-xs p-1">
                                Top-level category
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-5 py-4">
                        <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground/60">
                          {category.slug}
                        </code>
                      </td>

                      {/* Parent */}
                      <td className="px-5 py-4">
                        {parentName ? (
                          <span className="text-sm text-foreground/60">
                            {parentName}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                            Top-level
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-1",
                            "text-xs font-medium",
                            category.isActive
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-border bg-muted text-foreground/50",
                          )}
                        >
                          <span
                            className={cn(
                              "mr-1.5 h-1.5 w-1.5 rounded-full",
                              category.isActive
                                ? "bg-green-500"
                                : "bg-foreground/30",
                            )}
                          />

                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <Link
                            href={`/admin/categories/edit/${category._id}`}
                            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted shadow-sm">
              <FolderTree className="h-6 w-6 text-foreground/40" />
            </div>

            <Text variant="title" className="mt-5 text-lg">
              No categories yet
            </Text>

            <Text
              variant="mediumText"
              className="mx-auto mt-2 max-w-sm text-center"
            >
              Create your first category to start organizing your blog content.
            </Text>

            <Link
              href="/admin/categories/create"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Create your first category
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
