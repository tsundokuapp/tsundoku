import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { IoMdAdd } from "react-icons/io";
import { Container, Titulo } from "./styles";

const Obras = () => {
  return (
    <LayoutAdminMain>
      <Navbar
        title="Obras"
        placeholderSearchbox="Pesquisar Obras..."
        showSearhBox={true}
        titleLinkNavigation="Adicionar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.ADICIONAR_OBRA}
        icon={<IoMdAdd />}
      />
      <Container>
        <Titulo>Obras</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Obras;
