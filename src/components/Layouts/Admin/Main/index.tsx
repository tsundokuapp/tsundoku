import React, { useState } from "react";
import Grid from "./styles";
import Content from '@/components/Admin/Content/styles';
import SideMenu from "@/components/Admin/SideMenu";

interface ILayoutDashBoard { children?: React.ReactNode; }

const LayoutAdminMain = ({ children }: ILayoutDashBoard) => {
  return (
    <Grid className="wrapper" >
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
