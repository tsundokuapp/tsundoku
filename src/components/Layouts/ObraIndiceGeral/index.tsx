import {
  ContainerIndiceObra,
  Conteudo,
  Navegacao,
  Obra,
  Capa,
  Info,
  Titulo,
  Generos,
  DetalhesObra,
  BoxContentFooter,
  Sinopse,
} from "./styles";
import React from "react";
import { TsunAccordion } from "@/components/Accordion";
import { Footer } from "@/components/Footer";
import { TrilhaPath } from "@/components/TrilhaPath";
import { SectionEntryAnimation } from "@/animations/SectionEntry";
import { HeadTsun } from "@/components/Head";

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
      <ContainerIndiceObra>
        <HeadTsun title={titleWeb} />
        <SectionEntryAnimation>
          <Conteudo>
            <Navegacao>
              <TrilhaPath />
            </Navegacao>
            <Obra>
              <Capa>
                <img src={hrefCover} alt={altCover} />
              </Capa>
              <Info>
                <div>
                  <Titulo>
                    <h1>{titleWork}</h1>
                    <p>{titleWorkAlternative}</p>
                  </Titulo>
                  <Generos>
                    {genres.map((genre, i) => (
                      <p key={i}>{genre}</p>
                    ))}
                  </Generos>
                </div>
                <Sinopse>{synopsis}</Sinopse>
              </Info>
            </Obra>
          </Conteudo>
        </SectionEntryAnimation>

        <BoxContentFooter>
          <SectionEntryAnimation delay={true}>
            <DetalhesObra>
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
            </DetalhesObra>
          </SectionEntryAnimation>
          <SectionEntryAnimation delay={true}>
            <TsunAccordion />
          </SectionEntryAnimation>
        </BoxContentFooter>
      </ContainerIndiceObra>
      <Footer />
    </>
  );
};
