import Link from "next/link";
import { Suspense } from "react";

import { getCategoryTree } from "@/services/category.service";
import Text from "@/components/shared/Text";
import Button from "@/components/shared/Button";
import CategoryManagement from "@/components/admin/categories/CategoryManagement";
import Loading from "@/app/admin/categories/loading";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
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

      {/* Server-side data fetching */}
      <Suspense fallback={<Loading />}>
        <CategoriesContent />
      </Suspense>
    </div>
  );
}

async function CategoriesContent() {
  const categories = (await getCategoryTree()) || [];

  return <CategoryManagement categories={categories} />;
}
