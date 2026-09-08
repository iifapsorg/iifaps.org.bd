"use client";

import { usePathname } from "next/navigation";
import NavbarClient from "@/components/public/layout/navbar/NavbarClient";

export default function NavbarWrapper({ categoryTree }) {
  const pathname = usePathname();

  return (
    <NavbarClient 
      key={pathname} 
      pathname={pathname} 
      categoryTree={categoryTree} 
    />
  );
}