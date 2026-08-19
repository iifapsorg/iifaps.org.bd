"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/IIFAPS-logo.webp";
import { footerBrand, socialLinks } from "@/components/layout/footer/footer.config";

export default function FooterBrand() {
  return (
    <div>
      <Link
        href="/"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <Image
          src={logo}
          alt="IIFAPS Logo"
          width={70}
          height={70}
          priority
        />
      </Link>

      <p className="mt-5 leading-7 text-muted-foreground">
        {footerBrand.description}
      </p>

      <div className="mt-8 flex gap-3">
        {socialLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="flex h-11 w-11 items-center justify-center rounded-full  bg-background/40 hover:bg-[linear-gradient(90deg,#08203E,#557C93)] text-foreground/80 hover:text-white/80"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
}