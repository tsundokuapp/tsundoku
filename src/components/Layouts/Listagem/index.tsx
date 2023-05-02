import {
  Container,
  Content,
  Navigation,
  Grid,
  Cover,
  Titulo,
  Filters,
} from "./styles";
import React from "react";
import { Footer } from "@/components/Footer";
import { SearchBox } from "@/components/Heading/SearchBox";
import { DropdownSelect } from "@/components/DropdownSelect";
import { defaultFilters, blogFilters } from "@/constants/filters";
import { HeadTsun } from "@/components/Head";

interface ILayoutListingProps {
  children: React.ReactNode;
  columns: number;
  titleSession: string;
  titleWeb: string;
  sloganSession: string;
  hrefCover: string;
  altCover: string;
  filter: "default" | "blog";
}

export const LayoutListagem = ({
  children,
  columns,
  titleSession,
  titleWeb,
  sloganSession,
  hrefCover,
  altCover,
  filter,
}: ILayoutListingProps) => {
  return (
    <>
      <Container>
        <HeadTsun title={titleWeb} />
        <Cover>
          <img src={hrefCover} alt={altCover} />
        </Cover>
        <Content>
          <Navigation>
            <h3>{sloganSession}</h3>
            <SearchBox
              placeholder="Pesquisar..."
              borda="quadrada"
              variante="secundaria"
            />
            <Filters>
              {filter === "default" ? (
                <>
                  {defaultFilters.map((item, i) => (
                    <DropdownSelect
                      key={i}
                      label={item.label}
                      values={item.values}
                      onChange={(v) => console.log(v)}
                    />
                  ))}
                </>
              ) : (
                <>
                  {blogFilters.map((item, i) => (
                    <DropdownSelect
                      key={i}
                      label={item.label}
                      values={item.values}
                      onChange={(v) => console.log(v)}
                    />
                  ))}
                </>
              )}
            </Filters>
          </Navigation>

          <Titulo>{titleSession}</Titulo>
          <Grid columns={columns}>{children}</Grid>
        </Content>
      </Container>
      <Footer />
    </>
  );
};
