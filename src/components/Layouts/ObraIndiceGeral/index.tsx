import React from "react";
import { Footer } from "@/components/Footer";
import { TrilhaPath } from "@/components/TrilhaPath";
import { SectionEntryAnimation } from "@/animations/SectionEntry";
import { HeadTsun } from "@/components/Head";
import {
  Container,
  Content,
  Navigation,
  Work,
  Cover,
  Info,
  Title,
  Genres,
  WorkDetails,
  Details,
  Synopsis,
} from "./styles";

interface ILayoutMainProps {
  children: React.ReactNode;
  titleWeb: string;
  hrefCover: string;
  altCover: string;
  titleWork: string;
  titleWorkAlternative: string[];
  genres: string[];
  author: string;
  illustrator: string;
  type: string;
  status: string;
  synopsis: string;
}

export const LayoutObraIndiceGeral = ({
  children,
  titleWeb,
  hrefCover,
  altCover,
  titleWork,
  titleWorkAlternative,
  genres,
  author,
  illustrator,
  status,
  type,
  synopsis,
}: ILayoutMainProps) => {
  return (
    <>
      <Container>
        <HeadTsun title={titleWeb} />
        <SectionEntryAnimation>
          <Content>
            <Navigation>
              <TrilhaPath />
            </Navigation>
            <Work>
              <Cover>
                <img src={hrefCover} alt={altCover} />
              </Cover>
              <Info>
                <div>
                  <Title>
                    <h1>{titleWork}</h1>
                    <p>{titleWorkAlternative}</p>
                  </Title>
                  <Genres>
                    {genres.map((genre, i) => (
                      <p key={i}>{genre}</p>
                    ))}
                  </Genres>
                </div>
                <Synopsis>{synopsis}</Synopsis>
              </Info>
            </Work>
          </Content>
        </SectionEntryAnimation>

        <Details>
          <SectionEntryAnimation delay={true}>
            <WorkDetails>
              <h2>Detalhes da Obra</h2>
              <span>
                <p>Tipo:</p>
                <p>{type}</p>
              </span>
              <span>
                <p>Autor:</p>
                <p>{author}</p>
              </span>
              <span>
                <p>Ilustrador:</p>
                <p>{illustrator}</p>
              </span>
              <span>
                <p>Status:</p>
                <p>{status}</p>
              </span>
            </WorkDetails>
          </SectionEntryAnimation>
          {children}
        </Details>
      </Container>
      <Footer />
    </>
  );
};
