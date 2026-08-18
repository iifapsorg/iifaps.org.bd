// components/layout/Navbar.jsx

import { getCategoryTree } from "@/services/category.service";
import NavbarClient from "@/components/layout/navbar/NavbarClient";

export default async function Navbar() {
  const categoryTree = await getCategoryTree();

  return <NavbarClient categoryTree={categoryTree} />;
}