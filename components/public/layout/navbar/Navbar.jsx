import { getCategoryTree } from "@/services/category.service";
import NavbarWrapper from "@/components/public/layout/navbar/NavbarWrapper";

export default async function Navbar() {
  const categoryTree = await getCategoryTree();

  const activeCategories = categoryTree.filter((category) => category.isActive);

  return <NavbarWrapper categoryTree={activeCategories} />;
}
