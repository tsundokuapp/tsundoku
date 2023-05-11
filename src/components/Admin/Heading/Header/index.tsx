import DropdownTemas from "@/components/Heading/Dropdown";
import { SearchBox } from "@/components/Heading/SearchBox";
import { TrilhaPath } from "@/components/TrilhaPath";
import { LinkNavigation } from "../LinkNavigation";
import { BoxActions, BoxHead, BoxTitle, Container } from "./style";

interface IHeader {
  title: string;
  placeholderSearchbox: string;
  showSearhBox: boolean;
  showLinkNavigation: boolean;
  titleLinkNavigation: string;
  urlLinkNavigation: string;
  icon: any;
}

export const Header = ({
  title,
  placeholderSearchbox,
  showSearhBox,
  showLinkNavigation,
  titleLinkNavigation,
  urlLinkNavigation,
  icon,
}: IHeader) => {
  return (
    <Container>
      <BoxHead>
        <span className="navigation">
          <TrilhaPath isAdmin={true} />
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
