import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { Container, Titulo } from "./styles";

const Generos = () => {
  return (
    <LayoutAdminMain>
      <Navbar
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
