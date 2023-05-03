import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { Container, Titulo } from "./styles";

const Generos = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Gêneros"
        placeholderSearchbox="Pesquisar Gêneros..."
        showSearhBox={true}
        titleLinkNavigation=""
        showLinkNavigation={false}
        urlLinkNavigation={""}
        icon=""
      />
      <Container>
        <Titulo>Gêneros</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Generos;
