import React, { useState } from "react";
import Grid from "./styles";
import Content from "@/components/Admin/Content/styles";
import SideMenu from "@/components/Admin/SideMenu";
import React from "react";
import { Container } from "./styles";

interface ILayoutDashBoard {
  children?: React.ReactNode;
}

const LayoutAdminMain = ({ children }: ILayoutDashBoard) => {
  return (
    <Container>
      <SideMenu />
      <Content>{children}</Content>
    </Container>
  );
};

export default LayoutAdminMain;
