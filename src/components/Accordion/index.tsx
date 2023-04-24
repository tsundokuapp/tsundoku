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

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isExpanded, setExpand] = useState<boolean>();

  const contentRef = useRef<HTMLDivElement>();
  const contentHeight = isExpanded ? contentRef.current.scrollHeight : 0;

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

export const TsunAccordion = () => (
  <Layout>
    <Accordion title="Volume 18">
      <AccordionInfo>
        <img
          src="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2023/04/MT_V18_Capa_01.jpg"
          alt="random"
        />
        <p>
          Kicked out by his family and wandering the streets, an unemployed
          34-year-old shut-in thinks he’s hit rock-bottom—just as he’s hit and
          killed by a speeding truck! Awakening to find himself reborn as an
          infant in a world of swords and sorcery, but with the memories of his
          first life intact, Rudeus Greyrat is determined not to repeat his past
          mistakes. He’s going to make the most of this reincarnation as he sets
          off on the adventure of a second lifetime!
        </p>
      </AccordionInfo>
      <ListaCapitulos>
        <LinkPersonalizado
          href="/marcha-mortal"
          urlImgCap="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2023/04/MT_V18_Capa_01.jpg"
        >
          <div>
            <p>Capítulo 01</p>
            <p>Titulo provisório</p>
          </div>
        </LinkPersonalizado>
        <LinkPersonalizado
          href="/marcha-mortal"
          urlImgCap="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2023/04/MT_V18_Capa_01.jpg"
        >
          <div>
            <p>Capítulo 02</p>
            <p>Titulo provisório</p>
          </div>
        </LinkPersonalizado>
        <LinkPersonalizado
          href="/marcha-mortal"
          urlImgCap="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2023/04/MT_V18_Capa_01.jpg"
        >
          <div>
            <p>Capítulo 03</p>
            <p>Titulo provisório</p>
          </div>
        </LinkPersonalizado>
        <LinkPersonalizado
          href="/marcha-mortal"
          urlImgCap="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2023/04/MT_V18_Capa_01.jpg"
        >
          <div>
            <p>Capítulo 04</p>
            <p>Titulo provisório</p>
          </div>
        </LinkPersonalizado>
      </ListaCapitulos>
    </Accordion>
    <Accordion title="Volume 17">
      <AccordionInfo>
        <img
          src="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MT_V17_Capa_01ed.jpg?resize=1403%2C2000&ssl=1"
          alt="random"
        />
        <p>
          Kicked out by his family and wandering the streets, an unemployed
          34-year-old shut-in thinks he’s hit rock-bottom—just as he’s hit and
          killed by a speeding truck! Awakening to find himself reborn as an
          infant in a world of swords and sorcery, but with the memories of his
          first life intact, Rudeus Greyrat is determined not to repeat his past
          mistakes. He’s going to make the most of this reincarnation as he sets
          off on the adventure of a second lifetime!
        </p>
      </AccordionInfo>
      <ListaCapitulos>
        <LinkPersonalizado
          href="/marcha-mortal"
          urlImgCap="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MT_V17_Capa_01ed.jpg?resize=1403%2C2000&ssl=1"
        >
          <div>
            <p>Capítulo 01</p>
            <p>Titulo provisório</p>
          </div>
        </LinkPersonalizado>
        <LinkPersonalizado
          href="/marcha-mortal"
          urlImgCap="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MT_V17_Capa_01ed.jpg?resize=1403%2C2000&ssl=1"
        >
          <div>
            <p>Capítulo 02</p>
            <p>Titulo provisório</p>
          </div>
        </LinkPersonalizado>
      </ListaCapitulos>
    </Accordion>
  </Layout>
);
