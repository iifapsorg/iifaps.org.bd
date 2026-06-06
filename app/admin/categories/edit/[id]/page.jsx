import { notFound } from "next/navigation";
import { getCategoryById } from "@/services/category.service";
import CategoryForm from "@/components/admin/CategoryForm";

export const metadata = { title: "Edit Category | Admin" };

export default async function EditCategoryPage({ params }) {
  const {id} = await params ;
  const category = await getCategoryById(id);
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Category</h1>
      <CategoryForm initialData={category} />
    </div>
  );
}
