import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { BiArrowBack } from "react-icons/bi";
import { Container, Titulo } from "../styles";

const Adicionar = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Adicionar Post"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation="Voltar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.POSTS}
        icon={<BiArrowBack />}
      />
      <Container>
        <Titulo>Adicionar Post</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Adicionar;
