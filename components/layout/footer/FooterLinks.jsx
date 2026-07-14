import Link from "next/link";

export default function FooterLinks({ title, links, category = false }) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={
                category
                  ? `/categories/${item.slug}`
                  : item.href
              }
              className="text-muted-foreground transition hover:pl-2 hover:text-primary"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}