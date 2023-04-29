import React from "react";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import {Container, Titulo} from "./styles";

const Usuarios = () => {
  return (
    <LayoutAdminMain>
      <Container>
        <Titulo>Usuários</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Usuarios;