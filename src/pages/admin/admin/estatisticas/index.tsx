import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { Container, Titulo } from "./styles";

const Estatistica = () => {
  return (
    <LayoutAdminMain>
      <Navbar
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
