// // /admin/categories/edit/[id]/page

// import { notFound } from "next/navigation";
// import { getCategoryById } from "@/services/category.service";
// import CategoryForm from "@/components/admin/categories/CategoryForm";
// import Text from "@/components/shared/Text";

// export const metadata = { title: "Edit Category | Admin" };

// export default async function EditCategoryPage({ params }) {
//   const { id } = await params;
//   const category = await getCategoryById(id);
//   if (!category) notFound();

//   return (
//     <div>
//       <Text
//         variant="sectionHeading"
//         className="mb-5 text-2xl md:text-3xl capitalize"
//       >
//         Edit Category
//       </Text>
//       <CategoryForm initialData={category} />
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import { getUserById } from "@/services/user.service";
import Text from "@/components/shared/Text";
import UserForm from "@/components/admin/users/user-form/UserForm";

export const metadata = {
  title: "Edit User | Admin",
};

export default async function EditUserPage({ params }) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div>
      <Text
        variant="sectionHeading"
        className="mb-5 text-2xl md:text-3xl capitalize"
      >
        Edit User
      </Text>

      <UserForm initialData={user} />
    </div>
  );
}
