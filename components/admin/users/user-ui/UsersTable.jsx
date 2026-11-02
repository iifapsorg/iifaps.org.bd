"use client";

import { useState } from "react";
import { Users, UserRound, ShieldCheck, Pencil } from "lucide-react";

import Text from "@/components/shared/Text";
import { cn } from "@/utils/cn";
import { formatShortDate } from "@/utils/formatDate";
import DeleteUserButton from "./DeleteUserButton";
import Link from "next/link";

const tabs = [
  {
    label: "All Users",
    value: "all",
    heading: "All Users",
  },
  {
    label: "Super Admin",
    value: "super_admin",
    heading: "Super Admins",
  },
  {
    label: "Moderators",
    value: "moderator",
    heading: "Moderators",
  },
  {
    label: "Admins",
    value: "admin",
    heading: "Admins",
  },
  {
    label: "Authors",
    value: "author",
    heading: "Authors",
  },
];

const roleStyles = {
  super_admin: "bg-blue-600 text-white",
  admin: "border-blue-200 bg-blue-50 text-blue-700",
  moderator: "border-indigo-200 bg-indigo-200 text-indigo-700",
  author: "border-border bg-muted text-foreground/60",
};

export default function UsersTable({ users }) {
  const [activeTab, setActiveTab] = useState("all");

  const activeTabConfig = tabs.find((tab) => tab.value === activeTab);

  const filteredUsers =
    activeTab === "all"
      ? users
      : users.filter((user) => user.role === activeTab);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      {/* Table Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Users className="h-4 w-4 text-foreground/70" />
        </div>

        <div>
          <Text variant="title" className="mt-0 text-base">
            {activeTabConfig.heading}
          </Text>

          <Text variant="smallText" className="mt-0.5">
            {filteredUsers.length} users found
          </Text>
        </div>
      </div>

      {/* Dynamic Tabs */}
      <div className="border-b border-border">
        <div className="flex  overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "relative flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-tl-sm rounded-tr-sm",
                  isActive
                    ? "text-white bg-gray-600"
                    : "text-foreground/50 hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Name", "Email", "Role", "Joined", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/60"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-muted/30"
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
                  <td className="px-5 py-4 text-foreground/60">{user.email}</td>

                  {/* Role */}
                  <td className="px-2 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded border px-2 py-1 text-xs font-medium",
                        roleStyles[user.role] || roleStyles.author,
                      )}
                    >
                      {user.role?.replace("_", " ")}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4 text-foreground/50">
                    {formatShortDate(user.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/users/edit/${user._id}`}
                        className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-1 text-foreground transition-colors duration-200 hover:bg-green-900 hover:text-white hover:border-transparent"
                      >
                        <Pencil className="h-4 w-4" />

                        <span className="hidden lg:block text-sm">Edit</span>
                      </Link>

                      <DeleteUserButton
                        userId={user._id}
                        userName={user.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted shadow-sm">
            <ShieldCheck className="h-6 w-6 text-foreground/40" />
          </div>

          <Text variant="title" className="mt-5 text-lg">
            No {activeTabConfig.label.toLowerCase()} found
          </Text>

          <Text
            variant="mediumText"
            className="mx-auto mt-2 max-w-sm text-center"
          >
            There are currently no users in this category.
          </Text>
        </div>
      )}
    </div>
  );
}
