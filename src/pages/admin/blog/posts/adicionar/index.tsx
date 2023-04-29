import React from "react";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import {Container, Titulo} from "../styles";

const Adicionar = () => {
  return (
    <LayoutAdminMain>
      <Container>
        <Titulo>Adicionar Post</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Adicionar;