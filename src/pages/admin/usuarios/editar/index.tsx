import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { BiArrowBack } from "react-icons/bi";
import { Container, Titulo } from "../styles";

const Editar = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Editar Usuário"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation="Voltar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.USUARIOS}
        icon={<BiArrowBack />}
      />
      <Container>
        <Titulo>Editar Usuários</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Editar;
