import Head from "next/head";
import {
  ContainerIndiceObra,
  Conteudo,
  Navegacao,
  BoxBody,
  Capa,
  BoxInfo,
  Titulo,
  Generos,
  DetalhesObra,
  BoxContentFooter,
} from "./styles";
import React from "react";
import { TsunAccordion } from "@/components/Accordion";
import { Footer } from "@/components/Footer";
import { TrilhaPath } from "@/components/TrilhaPath";

interface ILayoutMainProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutObraIndice = ({ children, titulo }: ILayoutMainProps) => {
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
          <Navegacao>
            <TrilhaPath />
          </Navegacao>

          <BoxBody>
            <Capa>
              <img
                src="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V8_Capa.jpg"
                alt="atual volume da obra"
              />
            </Capa>
            <BoxInfo>
              <div>
                <Titulo>
                  <h1>Bruxa Errante, a Jornada de Elaina</h1>
                  <p>
                    Majo no Tabitabi, The Journey of Elaina, The Witchs Travels,
                    魔女の旅々
                  </p>
                </Titulo>
                <Generos>
                  <p>Aventura, </p>
                  <p>Comédia, </p>
                  <p>Fantasia, </p>
                  <p>Magia,</p>
                  <p>Sobrenatural,</p>
                  <p>Slice-of-Life,</p>
                  <p>Tragédia</p>
                </Generos>
              </div>
              <p>
                Em um determinado lugar, havia uma bruxa viajante. Seu nome era
                Elaina.
                <br />
                Por ser uma viajante, ela conheceu muitas pessoas e países
                enquanto continuava sua longa, longa jornada.
                <br />
                Um país que só aceitava magos, um gigante obcecado por músculos,
                um jovem às portas da morte aguardando o retorno de sua amada,
                uma princesa deixada sozinha no país em ruínas e a história da
                própria bruxa até agora e daqui para frente.
                <br />
                Enquanto conhece pessoas particularmente peculiares e
                experimenta os momentos de alegria de outras pessoas, mesmo
                agora, a bruxa continua contando a história do encontro e da
                separação.
                <br />
                <br />— Por favor, não se preocupe. Afinal, sou uma viajante.
                Devo me apressar.
                <br />
                <br />A Bruxa, sim, eu.
              </p>
            </BoxInfo>
          </BoxBody>
        </Conteudo>
        <BoxContentFooter>
          <DetalhesObra>
            <h2>Detalhes da Obra</h2>
            <span>
              <p>Tipo:</p>
              <p>Light Novel</p>
            </span>
            <span>
              <p>Autor:</p>
              <p>Shiraishi Jougi</p>
            </span>
            <span>
              <p>Ilustrador:</p>
              <p>Azure</p>
            </span>
            <span>
              <p>Status:</p>
              <p>Em andamento</p>
            </span>
          </DetalhesObra>
          <TsunAccordion />
        </BoxContentFooter>
      </ContainerIndiceObra>
      <Footer />
    </>
  );
};
