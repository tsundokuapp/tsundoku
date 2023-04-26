import Head from "next/head";
import {
  ContainerIndiceObra,
  Conteudo,
  Navigation,
  Obra,
  Capa,
  Info,
  Titulo,
  Generos,
  DetalhesObra,
  SectionVolumes,
  Sinopse,
} from "./styles";
import React from "react";
import { TsunAccordion } from "@/components/Accordion";
import { Footer } from "@/components/Footer";
import { TrilhaPath } from "@/components/TrilhaPath";

interface ILayoutMainProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutObraIndiceMobile = ({
  children,
  titulo,
}: ILayoutMainProps) => {
  return (
    <>
      <ContainerIndiceObra>
        <Head>
          <title>{titulo}</title>
          <meta
            name="description"
            content="Site de traduções de Light Novels e mangás"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Conteudo>
          <Navigation>
            <TrilhaPath />
          </Navigation>

          <Obra>
            <Capa>
              <img
                src="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V8_Capa.jpg"
                alt="atual volume da obra"
              />
            </Capa>
            <Info>
              <div>
                <Titulo>
                  <h1>Bruxa Errante, a Jornada de Elaina</h1>
                </Titulo>
                <Generos>
                  <p>Aventura,&nbsp;</p>
                  <p>Comédia,&nbsp;</p>
                  <p>Fantasia,</p>
                </Generos>
              </div>

              <DetalhesObra>
                <h2>Detalhes da Obra</h2>
                <span>
                  <p>Tipo:</p>
                  <p>Light Novel</p>
                </span>
                <span>
                  <p>Status:</p>
                  <p>Em andamento</p>
                </span>
              </DetalhesObra>
            </Info>
          </Obra>
        </Conteudo>
        <SectionVolumes>
          <Sinopse>
            Em um determinado lugar, havia uma bruxa viajante. Seu nome era
            Elaina.
            <br />
            Por ser uma viajante, ela conheceu muitas pessoas e países enquanto
            continuava sua longa, longa jornada.
            <br />
            Um país que só aceitava magos, um gigante obcecado por músculos, um
            jovem às portas da morte aguardando o retorno de sua amada, uma
            princesa deixada sozinha no país em ruínas e a história da própria
            bruxa até agora e daqui para frente.
            <br />
            Enquanto conhece pessoas particularmente peculiares e experimenta os
            momentos de alegria de outras pessoas, mesmo agora, a bruxa continua
            contando a história do encontro e da separação.
            <br />
            <br />— Por favor, não se preocupe. Afinal, sou uma viajante. Devo
            me apressar.
            <br />
            <br />A Bruxa, sim, eu.
          </Sinopse>
          <TsunAccordion />
        </SectionVolumes>
      </ContainerIndiceObra>
      <Footer />
    </>
  );
};
