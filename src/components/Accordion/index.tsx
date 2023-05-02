import React, { useState, useCallback, useRef } from "react";
import {
  Container,
  Title,
  ContentWrapper,
  Content,
  Chevron,
  Layout,
  ListaCapitulos,
  LinkPersonalizado,
  AccordionInfo,
} from "./styles";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { SIZES_RAW } from "@/constants/brakingPoints";

import { useRouter } from "next/router";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const TsunAccordion = () => {
  const router = useRouter();
  const path = router.pathname;
  const { id } = router.query;

  const truthPath = id ? path.replace("[id]", id.toString()) : path;

  const slug = `${truthPath}/chapter-01`;

  const capaVolume1 =
    "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Majo-no-Tabitabi-Capa-Volume-01.jpg?ssl=1";
  const capaVolume2 =
    "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V2_Cover.png?resize=1440%2C2048&ssl=1";

  const Accordion = ({ title, children }: AccordionProps) => {
    const [isExpanded, setExpand] = useState<boolean>();

    const contentRef = useRef<HTMLDivElement>();
    const contentHeight = isExpanded ? contentRef.current?.scrollHeight : 0;

    const handleExpandToggle = useCallback(() => {
      setExpand(!isExpanded);
    }, [isExpanded]);

    return (
      <Container>
        <Title onClick={handleExpandToggle}>
          {title}
          <Chevron direction={isExpanded ? "top" : "bottom"} />
        </Title>
        <ContentWrapper maxHeight={contentHeight}>
          <Content ref={contentRef}>{children}</Content>
        </ContentWrapper>
      </Container>
    );
  };

  const { width } = useWindowDimensions();
  const isTablet = width <= SIZES_RAW.TABLET;

  return (
    <Layout>
      <Accordion title="Volume 1">
        <AccordionInfo isTablet={isTablet}>
          <img src={capaVolume1} alt="random" />
          <p>
            Qual é a sua história favorita? Tem um herói que mata um dragão e
            salva uma princesa? Ou um filho da profecia destinado à grandeza?
            Bem, minha história favorita é um pouco diferente. É a história de
            uma bruxa que viaja pelo mundo, sem buscar nada em particular. Sem
            busca própria, ela está livre para vagar onde quer que o vento a
            leve, acrescentando algumas páginas à história de quem quer que ela
            encontre antes de partir para sua próxima aventura. Ao final de suas
            viagens, a bruxa acolhe uma aprendiz que um dia iniciará sua própria
            jornada. E assim o ciclo continua, ou assim continua a história.
            Agora, a bruxa que recomeça a história... quem poderia ser ela?
          </p>
        </AccordionInfo>
        <ListaCapitulos isTablet={isTablet}>
          <LinkPersonalizado
            href="/novels/bruxa-errante/capitulo-01"
            urlImgCap={capaVolume1}
          >
            <div>
              <p>Capítulo 01</p>
              <p>Titulo provisório</p>
            </div>
          </LinkPersonalizado>
          <LinkPersonalizado href={slug} urlImgCap={capaVolume1}>
            <div>
              <p>Capítulo 02</p>
              <p>Capítulo da Hinowa</p>
            </div>
          </LinkPersonalizado>
          <LinkPersonalizado href="/marcha-mortal" urlImgCap={capaVolume1}>
            <div>
              <p>Capítulo 03</p>
              <p>Titulo provisório</p>
            </div>
          </LinkPersonalizado>
          <LinkPersonalizado href="/marcha-mortal" urlImgCap={capaVolume1}>
            <div>
              <p>Capítulo 04</p>
              <p>Titulo provisório</p>
            </div>
          </LinkPersonalizado>
        </ListaCapitulos>
      </Accordion>
      <Accordion title="Volume 2">
        <AccordionInfo isTablet={isTablet}>
          <img src={capaVolume2} alt="random" />
          <p>
            Uma princesa fugitiva, uma nação zumbi, um gato divino e muito,
            muito pão. Estes são apenas alguns dos muitos destaques que colorem
            as viagens da nossa jovem bruxa. Cada lugar que ela visita é uma
            nova história esperando para ser contada, repleta de encontros que
            são tudo menos típicos - e raramente terminam da maneira que alguém
            espera. Tal é a magia de vagar. Você nunca sabe exatamente onde você
            vai acabar. Uma história que pode mudar a qualquer momento e se
            tornar algo completamente diferente...
          </p>
        </AccordionInfo>
        <ListaCapitulos isTablet={isTablet}>
          <LinkPersonalizado href="/marcha-mortal" urlImgCap={capaVolume2}>
            <div>
              <p>Capítulo 01</p>
              <p>Titulo provisório</p>
            </div>
          </LinkPersonalizado>
          <LinkPersonalizado href="/marcha-mortal" urlImgCap={capaVolume2}>
            <div>
              <p>Capítulo 02</p>
              <p>Titulo provisório</p>
            </div>
          </LinkPersonalizado>
        </ListaCapitulos>
      </Accordion>
    </Layout>
  );
};
