import Link from "next/link";

export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">{title}</h3>

      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-muted-foreground transition-[letter-spacing,color] duration-300 hover:tracking-[1px] hover:text-muted-foreground/90 capitalize"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
