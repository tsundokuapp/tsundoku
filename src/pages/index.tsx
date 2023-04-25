import { LayoutMain } from "../components/Layouts/Main";
import { Card } from "@/components/Card";
import { Carousel } from "../components/Carousel";
import { Box, BoxAviso } from "@/styles/Home/styles";
import { Secao } from "@/components/Secao";
import { useState } from "react";
import Image from "next/image";

import elainaCover from "@/assets/img/elaina8.webp";
import goblinCover from "@/assets/img/goblin.webp";
import marchaCover from "@/assets/img/marcha.webp";
import tearCover from "@/assets/img/tear.webp";
import tremCover from "@/assets/img/trem.webp";

export default function Home() {
  const [temAviso, setTemAviso] = useState(true);

  // TODO: Função temporária
  const desativaAviso = () => {
    setTemAviso(false);
  };

  return (
    <LayoutMain title="Tsundoku Traduções">
      <Secao>
        <Carousel />
        {temAviso && (
          <BoxAviso onClick={desativaAviso}>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        )}
      </Secao>
      <Secao titulo="Adicionados Recentemente" direcaoItens="row">
        <Card
          href={"/novels/bruxa-errante"}
          capa={elainaCover}
          titulo="Bruxa Errante"
          autor="Kazuma Kamachi"
          volume="Volume 10"
        />
        <Card
          href={"/novels/bruxa-errante"}
          capa={goblinCover}
          titulo="Matador de Goblins"
          autor="Kazuma Kamachi"
          volume="Volume Único"
        />
        <Card
          href={"/novels/bruxa-errante"}
          capa={tearCover}
          titulo="Império Tearmoon"
          autor="Kazuma Kamachi"
          volume="Volume 2"
        />
        <Card
          href={"/novels/bruxa-errante"}
          capa={marchaCover}
          titulo="Marcha Mortal"
          autor="Kazuma Kamachi"
          volume="Volume 5"
        />
      </Secao>

      <Secao titulo="Recomendação da Tsundoku" direcaoItens="row">
        <Image
          src={tremCover}
          alt="capa do volume"
          width={240}
          height={240 * 1.5}
        />
        <Box>
          <strong>Trem da Noite</strong>
          <span>
            <strong>Sinopse: </strong>
            Nós seis passamos nossos dias de faculdade em Quioto. Há dez anos,
            no Festival do Fogo de Kurama, Hasegawa simplesmente desapareceu.
            Dez anos depois, os cinco que restaram voltaram a se encontrar em
            Kurama, esperando mais uma vez encontrá-la. À medida que a noite
            caía, começamos a trocar histórias sobre coisas estranhas que
            encontramos durante nossas viagens, incluindo a misteriosa série de
            obras de arte de Kishida Michio, conhecida como &quotTrem da
            Noite&quot. Neste Romance, Morimi Tomihiko magistralmente tece os
            juventude junto com histórias de fantasmas de arrepiar os cabelos,
            tudo envolvendo passeios noturnos. — Não há nenhum lugar que a noite
            não toque. Todo mundo está em uma noite eterna.
          </span>
        </Box>
      </Secao>
    </LayoutMain>
  );
}
