// app/page.jsx

import Navbar from "@/components/shared/Navbar";
import { getCategoryTree } from "@/services/category.service";

export default async function Page() {
  const categoryTree = await getCategoryTree();

  return (
    <>
      <Navbar categories={categoryTree} />
    </>
  );
}