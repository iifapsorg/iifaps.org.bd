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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
}