// /admin/users/page

import { Users, UserRound, ShieldCheck, UserCheck } from "lucide-react";

import { getAllUsers } from "@/services/user.service";
import { formatShortDate } from "@/utils/formatDate";
import Text from "@/components/shared/Text";
import { cn } from "@/utils/cn";

export const metadata = {
  title: "Users | Admin",
};

const roleStyles = {
  admin: "border-purple-200 bg-purple-50 text-purple-700",
  editor: "border-blue-200 bg-blue-50 text-blue-700",
  author: "border-border bg-muted text-foreground/60",
};

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  const superAdmin = users.filter((user) => user.role === "super_admin").length;
  const moderators = users.filter((user) => user.role === "moderator").length;

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      iconClass: "bg-muted",
      iconColor: "text-foreground/60",
      valueClass: "text-foreground",
    },
    {
      label: "Active",
      value: activeUsers,
      icon: UserCheck,
      iconClass: "bg-green-50",
      iconColor: "text-green-600",
      valueClass: "text-green-600",
    },
    {
      label: "Inactive",
      value: inactiveUsers,
      icon: UserRound,
      iconClass: "bg-muted",
      iconColor: "text-foreground/50",
      valueClass: "text-foreground/50",
    },
    {
      label: "Super Admin",
      value: superAdmin,
      icon: ShieldCheck,
      iconClass: "bg-purple-50",
      iconColor: "text-purple-600",
      valueClass: "text-purple-600",
    },
    {
      label: "Moderators",
      value: moderators,
      icon: ShieldCheck,
      iconClass: "bg-purple-50",
      iconColor: "text-purple-600",
      valueClass: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6 pb-5">
      {/* Header */}
      <div>
        <Text variant="sectionHeading" className="mt-0 text-2xl md:text-3xl">
          Users
        </Text>

        <Text variant="mediumText" className="mt-1">
          Manage and monitor users across your admin platform.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats?.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Text variant="smallText">{stat.label}</Text>

                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    stat.iconClass,
                  )}
                >
                  <Icon className={cn("h-4 w-4", stat.iconColor)} />
                </div>
              </div>

              <p className={cn("mt-3 text-2xl font-bold", stat.valueClass)}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        {/* Table Header */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <Users className="h-4 w-4 text-foreground/70" />
          </div>

          <div>
            <Text variant="title" className="mt-0 text-base">
              All Users
            </Text>
          </div>
        </div>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Name
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Email
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Role
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                          <UserRound className="h-4 w-4 text-foreground/50" />
                        </div>

                        <div>
                          <p className="font-medium text-foreground">
                            {user.name || "Unnamed User"}
                          </p>

                          <p className="mt-0.5 text-xs text-foreground/40">
                            User account
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground/60">
                        {user.email}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1",
                          "text-xs font-medium capitalize",
                          roleStyles[user.role] || roleStyles.author,
                        )}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1",
                          "text-xs font-medium",
                          user.isActive
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-red-200 bg-red-50 text-red-600",
                        )}
                      >
                        <span
                          className={cn(
                            "mr-1.5 h-1.5 w-1.5 rounded-full",
                            user.isActive ? "bg-green-500" : "bg-red-500",
                          )}
                        />

                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-sm text-foreground/50">
                      {formatShortDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted shadow-sm">
              <Users className="h-6 w-6 text-foreground/40" />
            </div>

            <Text variant="title" className="mt-5 text-lg">
              No users found
            </Text>

            <Text
              variant="mediumText"
              className="mx-auto mt-2 max-w-sm text-center"
            >
              There are currently no registered users in the system.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
