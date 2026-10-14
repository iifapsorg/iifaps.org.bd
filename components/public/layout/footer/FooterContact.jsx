import { contactInfo } from "@/components/public/layout/footer/footer.config";
import Link from "next/link";

export default function FooterContact() {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">Contact</h3>

      <ul className="space-y-4 text-muted-foreground">
        {contactInfo.map((item, index) => (
          <li key={item}>
            {index === 0 ? (
              <Link
                href={`mailto:${item}`}
                className="transition-colors hover:text-primary"
              >
                {item}
              </Link>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
