import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { BiArrowBack } from "react-icons/bi";
import { Container, Titulo } from "../styles";

const Editar = () => {
  return (
    <LayoutAdminMain>
      <Navbar
        title="Editar Volume"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation="Voltar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.VOLUMES}
        icon={<BiArrowBack />}
      />
      <Container>
        <Titulo>Editar Volume</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Editar;
