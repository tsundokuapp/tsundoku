import React from "react";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import {Container, Titulo} from "./styles";

const Posts = () => {
  return (
    <LayoutAdminMain>
      <Container>
        <Titulo>Posts</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default Posts;