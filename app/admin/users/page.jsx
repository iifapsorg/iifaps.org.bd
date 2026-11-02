// /admin/users/page.jsx

import { Suspense } from "react";
import Link from "next/link";

import Loading from "@/app/admin/users/loading";
import Text from "@/components/shared/Text";
import Button from "@/components/shared/Button";
import UsersDataContent from "@/components/admin/users/user-ui/UsersDataContent";

export const metadata = {
  title: "Users | Admin",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 pb-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <Text variant="sectionHeading" className="mt-0 text-2xl md:text-3xl">
            Users
          </Text>

          <Text variant="mediumText" className="mt-2">
            Manage and monitor users across your admin platform.
          </Text>
        </div>

        <Link href="/admin/users/create">
          <Button>Add New User</Button>
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <UsersDataContent />
      </Suspense>
    </div>
  );
}
