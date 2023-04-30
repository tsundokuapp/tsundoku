import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { IoMdAdd } from "react-icons/io";
import { Container, Titulo } from "./styles";

const Usuarios = () => {
  return (
    <LayoutAdminMain>
      <Navbar
        title="Usuários"
        placeholderSearchbox="Pesquisar Usuários..."
        showSearhBox={true}
        titleLinkNavigation="Adicionar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.ADICIONAR_USUARIOS}
        icon={<IoMdAdd />}
      />
      <Container>
        <Titulo>Usuários</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Usuarios;
