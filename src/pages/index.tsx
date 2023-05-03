import { useState } from "react";
import Image from "next/image";

import { Box, BoxAviso } from "@/styles/Home/styles";
import { LayoutMain } from "@/components/Layouts/Main";
import { Section } from "@/components/Section";
import { Carousel } from "@/components/Carousel";
import { Card } from "@/components/Card";
import { AllWorksTsun as works } from "@/constants/WorksTsun";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

export default function Home() {
  const [temAviso, setTemAviso] = useState(true);
  const { isMobile, isTablet } = useWindowDimensions();

  const myLoader = () => {
    return "https://i3.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/Tsundoku-Traducoes-Web-Novel-Re-Zero-Volume-01-Capa.png";
  };

  // TODO: Função temporária
  const desativaAviso = () => {
    setTemAviso(false);
  };

  const itensVisibles = isMobile ? 2 : isTablet ? 3 : 4;
  const adaptativeView = isMobile ? "column" : "row";

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

      <Section
        title="Recomendação da Tsundoku"
        directionItems={adaptativeView}
        wrap={false}
      >
        <Image
          loader={myLoader}
          src="volume.png"
          alt="capa do volume"
          width={240}
          height={240 * 1.5}
          style={{ borderRadius: "0.5rem" }}
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
            encontramos durante nossas viagens.
          </span>
          <span>
            Staff: Essa é sem dúvida a melhor novel da Tsun, fico feliz de ter
            traduzido alguns capítulos.
          </span>
          <strong>Nota Staff: 7.5</strong>
        </Box>
      </Section>
    </LayoutMain>
  );
}
