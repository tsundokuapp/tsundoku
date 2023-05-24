import Image from "next/image";

import { Box } from "@/styles/Home/styles";
import { LayoutMain } from "@/components/Layouts/Main";
import { Section } from "@/components/Section";
import { Carousel } from "@/components/Carousel";
import { Card } from "@/components/Card";
import { AllWorksTsun as works } from "@/constants/WorksTsun";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SideMenuMobile } from "@/components/Heading/SideMenu";
import { Warning } from "@/components/Warning";
import Link from "next/link";

export default function Home() {
  const { isMobile, isExtraMobile } = useWindowDimensions();

  const myLoader = () => {
    return "https://i3.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/Tsundoku-Traducoes-Web-Novel-Re-Zero-Volume-01-Capa.png";
  };

  // TODO: os valores de itensVisibles e adaptativeView estão retornando com verificação errada devido uma renderização forçada quando se navega para telas de novels e retorna para a home, talvez a troca de tela para layouts não adaptados para mobile esteja influenciando na verificação das condições de dimensionamento de tela visto que não ocorre quando se navega para uma tela de indice de novel e retorna para a home. Nota: useEffect não existia originalmente, foi adicionado na tentativa de corrigir o problema, porém não deu certo. Caso o problema seja os layouts, remover os useEffect e o useState fazendo const para minimizar processamento.

  const itensVisibles = isExtraMobile ? 2 : 4;
  const adaptativeView = isMobile ? "column" : "row";

  return (
    <LayoutMain title="Tsundoku Traduções">
      <SideMenuMobile />
      <Section>
        <Carousel />
        <Warning
          important={false}
          message="Site em construção, em breve uma nova Tsundoku!"
        />
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
        wrapContent={false}
      >
        <Link href={"/novels/bruxa-errante"}>
          <Image
            loader={myLoader}
            src="volume.png"
            alt="capa do volume"
            width={240}
            height={240 * 1.5}
            style={{ borderRadius: "0.5rem" }}
          />
        </Link>
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
