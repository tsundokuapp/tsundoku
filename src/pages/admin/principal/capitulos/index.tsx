import React from "react";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import {Container, Titulo} from "./styles";

const Capitulos = () => {
  return (
    <LayoutAdminMain>
      <Container>
        <Titulo>Capítulos</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Capitulos;