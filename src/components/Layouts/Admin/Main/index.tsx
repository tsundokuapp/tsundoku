import Content from "@/components/Admin/Content/styles";
import SideMenu from "@/components/Admin/SideMenu";
import React from "react";
import Grid from "./styles";

interface ILayoutDashBoard {
  children?: React.ReactNode;
}

const LayoutAdminMain = ({ children }: ILayoutDashBoard) => {
  return (
    <Grid className="wrapper">
      <div className="coluna-grid">
        <SideMenu />
      </div>
      <div className="coluna-grid-main">
        <Content>{children}</Content>
      </div>
    </Grid>
  );
};

export default LayoutAdminMain;
