
import { getUsers } from "@/services/user.service";

import UsersStats from "./UsersStats";
import UsersTable from "./UsersTable";

export default async function UsersDataContent() {
  const users = await getUsers();

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      type: "total",
    },
    {
      label: "Super Admins",
      value: users.filter((user) => user.role === "super_admin").length,
      type: "super_admin",
    },
    {
      label: "Admins",
      value: users.filter((user) => user.role === "admin").length,
      type: "admin",
    },
    {
      label: "Moderators",
      value: users.filter((user) => user.role === "moderator").length,
      type: "moderator",
    },
    {
      label: "Authors",
      value: users.filter((user) => user.role === "author").length,
      type: "author",
    },
  ];

  return (
    <div className="space-y-6">
      <UsersStats stats={stats} />

      <UsersTable users={users} />
    </div>
  );
}
