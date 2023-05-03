import { Header } from "@/components/Admin/Heading/Header";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { IoMdAdd } from "react-icons/io";
import { Container, Titulo } from "./styles";

const Posts = () => {
  return (
    <LayoutAdminMain>
      <Header
        title="Posts"
        placeholderSearchbox="Pesquisar Posts..."
        showSearhBox={true}
        titleLinkNavigation="Adicionar"
        showLinkNavigation={true}
        urlLinkNavigation={ROTAS.ADICIONAR_POSTS}
        icon={<IoMdAdd />}
      />
      <Container>
        <Titulo>Posts</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Posts;
