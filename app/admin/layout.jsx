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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
