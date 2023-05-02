import { useState } from "react";
import Image from "next/image";

import { Box, BoxAviso } from "@/styles/Home/styles";
import { LayoutMain } from "@/components/Layouts/Main";
import { Section } from "@/components/Section";
import { Carousel } from "@/components/Carousel";
import { Card } from "@/components/Card";
import { AllWorksTsun as works } from "@/constants/WorksTsun";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import tremCover from "@/assets/img/trem.webp";

export default function Home() {
  const [temAviso, setTemAviso] = useState(true);
  const { isMobile, isTablet } = useWindowDimensions();

  // TODO: Função temporária
  const desativaAviso = () => {
    setTemAviso(false);
  };

  const itensVisibles = isTablet ? 4 : isMobile ? 3 : 2;

  return (
    <LayoutMain title="Tsundoku Traduções">
      <Section>
        <Carousel />
        {temAviso && (
          <BoxAviso onClick={desativaAviso}>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        )}
      </Section>
      <Section title="Adicionados Recentemente" directionItems="row">
        {works.slice(0, itensVisibles).map((item, i) => (
          <Card
            key={i}
            href={item.href}
            capa={item.cover}
            titulo={item.title}
            autor={item.author}
            volume={`Volume ${item.volume}`}
          />
        ))}
      </Section>

      <Section title="Recomendação da Tsundoku" directionItems="row">
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
      </Section>
    </LayoutMain>
  );
}
