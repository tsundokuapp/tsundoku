import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { Container, Titulo } from "./styles";

const Estatistica = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Estatísticas"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation=""
        showLinkNavigation={false}
        urlLinkNavigation="#"
        icon=""
      />
      <Container>
        <Titulo>Estatísticas</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Estatistica;
