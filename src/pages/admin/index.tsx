import { CardContent } from "@/components/Admin/CardContent";
import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { BoxAviso } from "@/styles/Home/styles";
import { useState } from "react";
import { Container, ContainerCardsHead } from "./style";

const DashBoard = () => {
  const [temAviso, setTemAviso] = useState(true);

  // TODO: Função temporária
  const desativaAviso = () => {
    setTemAviso(false);
  };

  return (
    <LayoutAdminMain>
      <Header
        title="Dashboard"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation=""
        showLinkNavigation={false}
        urlLinkNavigation="#"
        icon=""
      />
      <Container>
        {temAviso && (
          <BoxAviso onClick={desativaAviso}>
            <h2>AVISO</h2>
            <p>Aceitamos sugestões os conteúdos da Dashboard!</p>
          </BoxAviso>
        )}
        <ContainerCardsHead>
          <CardContent width="18.75rem" height="10rem" title="Conteúdo 01">
            Conteúdo a definir
          </CardContent>
          <CardContent width="18.75rem" height="10rem" title="Conteúdo 02">
            Conteúdo a definir
          </CardContent>
          <CardContent width="18.75rem" height="10rem" title="Conteúdo 03">
            Conteúdo a definir
          </CardContent>
        </ContainerCardsHead>
        <>
          <CardContent
            width="62.5rem"
            height="31.25rem"
            title="Conteúdo Principal"
          >
            Conteúdo a definir
          </CardContent>
        </>
      </Container>
    </LayoutAdminMain>
  );
};

export default DashBoard;
