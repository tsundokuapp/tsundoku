import DropdownTemas from "@/components/Heading/Dropdown";
import { SearchBox } from "@/components/Heading/SearchBox";
import { ROTAS } from "@/constants/rotas";
import Link from "next/link";
import { LinkNavigation } from "../LinkNavigation";
import { BoxActions, BoxHead, BoxTitle, Container } from "./style";

interface INavbar {
  title: string;
  placeholderSearchbox: string;
  showSearhBox: boolean;
  showLinkNavigation: boolean;
  titleLinkNavigation: string;
  urlLinkNavigation: string;
  icon: any;
}

export const Navbar = ({
  title,
  placeholderSearchbox,
  showSearhBox,
  showLinkNavigation,
  titleLinkNavigation,
  urlLinkNavigation,
  icon,
}: INavbar) => {
  return (
    <Container>
      <BoxHead>
        <span className="navigation">
          <Link href={ROTAS.DASHBOARD}>ADMIN</Link>
        </span>
        <DropdownTemas />
      </BoxHead>
      <BoxTitle>{title}</BoxTitle>
      <BoxActions>
        <div>
          {showSearhBox && (
            <SearchBox
              placeholder={placeholderSearchbox}
              borda="quadrada"
              variante="secundaria"
            />
          )}
        </div>
        <div>
          {showLinkNavigation && (
            <LinkNavigation
              title={titleLinkNavigation}
              url={urlLinkNavigation}
              icon={icon}
            />
          )}
        </div>
      </BoxActions>
    </Container>
  );
};
