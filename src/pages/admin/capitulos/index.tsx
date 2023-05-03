import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { IoMdAdd } from "react-icons/io";
import { Container, Titulo } from "./styles";

const Capitulos = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Capítulos"
        placeholderSearchbox="Pesquisar Capítulos..."
        showSearhBox={true}
        titleLinkNavigation="Adicionar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.ADICIONAR_CAPITULO}
        icon={<IoMdAdd />}
      />
      <Container>
        <Titulo>Capítulos</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Capitulos;
