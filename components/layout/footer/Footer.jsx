import Container from "@/components/shared/Container";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "@/components/layout/footer/FooterBottom";

import {
  quickLinks,
  categories,
} from "@/components/layout/footer/footer.config";

export default function Footer() {
  return (
    <footer className="relative mt-25 bg-secondary">
      <Container className="py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <FooterBrand />

          <FooterLinks
            title="Quick Links"
            links={quickLinks}
          />

          <FooterLinks
            title="Categories"
            links={categories}
            category
          />

          <FooterContact />

        </div>

        <FooterBottom />

      </Container>
    </footer>
  );
}