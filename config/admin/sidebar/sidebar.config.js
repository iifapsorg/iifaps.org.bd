import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
} from "lucide-react";
export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
];
