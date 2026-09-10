import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";

import NavbarLogo from "./NavbarLogo";
import NavbarActions from "./NavbarActions";

export default function NavbarHeader({
  isHome,
  isMenuOpen,
  isCategoryOpen,
  onMenuToggle,
  onCategoryToggle,
  onSearchOpen,
}) {
  return (
    <Container>
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
          <NavbarLogo />

          <div className="min-w-0">
            <Text
              variant="normalText"
              className={`
                hidden sm:block leading-tight font-semibold sm:text-xs md:w-70
                md:text-sm lg:text-base
              `}
            >
              INTERNATIONAL INSTITUTE FOR ADVANCED POLITICAL STUDIES
            </Text>
          </div>
        </div>

        <NavbarActions
          isHome={isHome}
          isMenuOpen={isMenuOpen}
          isCategoryOpen={isCategoryOpen}
          onMenuToggle={onMenuToggle}
          onCategoryToggle={onCategoryToggle}
          onSearchOpen={onSearchOpen}
        />
      </div>
    </Container>
  );
}