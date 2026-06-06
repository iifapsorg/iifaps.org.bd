import CategoryForm from "@/components/admin/CategoryForm";

export const metadata = { title: "Create Category | Admin" };

export default function CreateCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Category</h1>
      <CategoryForm />
    </div>
  );
}
