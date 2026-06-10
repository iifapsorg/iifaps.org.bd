// components/shared/Navbar

import React from "react";
import { getCategoryTree } from "@/services/category.service";
import CategoryNav from "@/components/shared/CategoryNav";

const Navbar = async () => {
  const categoryTree = await getCategoryTree();

  return (
    <div>
      <CategoryNav categories={categoryTree} />
    </div>
  );
};

export default Navbar;
