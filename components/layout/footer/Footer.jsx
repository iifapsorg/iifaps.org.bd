import Container from "@/components/shared/Container";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "@/components/layout/footer/FooterBottom";

import {
  about,
  our_team,
} from "@/components/layout/footer/footer.config";

export default function Footer() {
  return (
    <footer className="relative bg-secondary border-t border-border">
      <Container className="py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <FooterBrand />

          <FooterLinks
            title="About"
            links={about}
          />

          <FooterLinks
            title="Our Team"
            links={our_team}
          />

          <FooterContact />

        </div>

        <FooterBottom />

      </Container>
    </footer>
  );
}