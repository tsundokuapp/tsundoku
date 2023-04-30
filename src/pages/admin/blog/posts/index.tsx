import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { ROTAS } from "@/constants/rotas";
import { IoMdAdd } from "react-icons/io";
import { Container, Titulo } from "./styles";

const Posts = () => {
  return (
    <LayoutAdminMain>
      <Navbar
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
