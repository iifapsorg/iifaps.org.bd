import { contactInfo } from "@/components/layout/footer/footer.config";

export default function FooterContact() {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">
        Contact
      </h3>

      <ul className="space-y-4 text-muted-foreground">
        {contactInfo.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}