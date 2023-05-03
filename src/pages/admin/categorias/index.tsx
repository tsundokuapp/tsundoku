import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { Container, Titulo } from "./styles";

const Categoria = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Categorias"
        placeholderSearchbox="Pesquisar Categorias..."
        showSearhBox={true}
        titleLinkNavigation=""
        showLinkNavigation={false}
        urlLinkNavigation={""}
        icon=""
      />
      <Container>
        <Titulo>Categorias</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Categoria;
