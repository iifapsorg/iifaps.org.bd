import { getCategoryTree } from "@/services/category.service";
import NavbarWrapper from "@/components/public/layout/navbar/NavbarWrapper";

export default async function Navbar() {
  const categoryTree = await getCategoryTree();

  const activeCategories = categoryTree
    .filter((category) => category.isActive)
    .sort((a, b) => {
      if (a.slug === "research") return 1;
      if (b.slug === "research") return -1;
      return 0;
    });

  return <NavbarWrapper categoryTree={activeCategories} />;
}
