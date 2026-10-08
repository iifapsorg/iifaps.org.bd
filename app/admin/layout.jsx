// /admin/layout

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = { title: "Admin Panel" };

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="w-full h-[calc(100vh-65px)] grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
      <aside className="lg:col-span-1">
        <Sidebar />
      </aside>

      <main className="lg:col-span-3 lg:h-full p-2 lg:p-4 overflow-auto">{children}</main>
    </div>
  );
}
