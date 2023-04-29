import React from "react";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import {Container, Titulo} from "./styles";

const Categoria = () => {
  return (
    <LayoutAdminMain>
      <Container>
        <Titulo>Categorias</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Categoria;