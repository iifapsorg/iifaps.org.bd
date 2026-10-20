import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/CAPS-logo.png";

export default function NavbarLogo() {
  return (
    <Link href="/" className="shrink-0">
      <Image
        className="rounded-md"
        src={logo}
        alt="CAPS Logo"
        width={40}
        height={40}
        priority
      />
    </Link>
  );
}
