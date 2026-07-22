import { getCategoryTree } from "@/services/category.service";
import NavbarClient from "@/components/layout/navbar/NavbarClient";

export default async function Navbar() {
  const categoryTree = await getCategoryTree();
  console.log(categoryTree);
  console.log("hello");
  

  return <NavbarClient categoryTree={categoryTree} />;
}