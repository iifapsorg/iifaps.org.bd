// /admin/blogs/create/page

import UserForm from "@/components/admin/users/user-form/UserForm";

export const metadata = { title: "Create User | Admin" };

export default function CreateBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground/70 mb-6">Create New User</h1>
      <UserForm />
    </div>
  );
}
