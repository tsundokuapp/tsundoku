import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { BiArrowBack } from "react-icons/bi";
import { Container, Titulo } from "../styles";

const Editar = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Editar Capítulo"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation="Voltar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.CAPITULOS}
        icon={<BiArrowBack />}
      />
      <Container>
        <Titulo>Editar Capítulos</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Editar;
