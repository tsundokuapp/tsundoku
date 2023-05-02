import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { IoMdAdd } from "react-icons/io";
import { Container, Titulo } from "./styles";

const Volumes = () => {
  return (
    <LayoutAdminMain>
      <Navbar
        title="Volumes"
        placeholderSearchbox="Pesquisar Volumes..."
        showSearhBox={true}
        titleLinkNavigation="Adicionar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.ADICIONAR_VOLUME}
        icon={<IoMdAdd />}
      />
      <Container>
        <Titulo>Volumes</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Volumes;
