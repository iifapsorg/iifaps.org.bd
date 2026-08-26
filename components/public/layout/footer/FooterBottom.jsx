import Link from "next/link";
import { bottomLinks } from "@/components/public/layout/footer/footer.config";

export default function FooterBottom() {
  return (
    <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
      <p>
        © {new Date().getFullYear()} 
        <Link href={"/"}> IIFAPS</Link>.
        
         All rights reserved.
      </p>

      <div className="flex gap-6">
        {bottomLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-muted-foreground transition-[letter-spacing,color] duration-300 hover:tracking-[1px] hover:text-muted-foreground/90 capitalize"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}