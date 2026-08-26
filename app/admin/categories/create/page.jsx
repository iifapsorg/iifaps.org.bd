// /admin/categories/create/page

import CategoryForm from "@/components/admin/categories/CategoryForm";
import Text from "@/components/shared/Text";

export const metadata = { title: "Create Category | Admin" };

export default function CreateCategoryPage() {
  return (
    <div>
      <Text variant="sectionHeading" className="mb-5 text-2xl md:text-3xl capitalize">
        Add categories
      </Text>
      <CategoryForm />
    </div>
  );
}
