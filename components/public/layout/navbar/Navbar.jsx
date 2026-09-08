import { getCategoryTree } from "@/services/category.service";
import NavbarWrapper from "@/components/public/layout/navbar/NavbarWrapper";

export default async function Navbar() {
  const categoryTree = await getCategoryTree();

  return <NavbarWrapper categoryTree={categoryTree} />;
}