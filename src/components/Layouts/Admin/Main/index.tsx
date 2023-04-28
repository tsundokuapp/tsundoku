import React, { useState } from "react";
import Grid from "./styles";
import MainHeader from "../../../Admin/MainHeader";
import Aside from "../../../Admin/Aside";
import Content from '../../../Admin/Content/styles';

interface ILayoutDashBoard { children?: React.ReactNode; }

const LayoutAdminMain = ({ children }: ILayoutDashBoard) => {  
  const [menuAtivo, setMenuAtivo] = useState(true);

  var classeHide = "";
  if (!menuAtivo) {
    classeHide = "hide";
  }

  return (
    <Grid menu={menuAtivo} className="wrapper" >
        <div className="coluna-grid">
          <Aside className={classeHide + " aside"} />         
        </div>
        <div className="coluna-grid-main">
          <MainHeader setMenu={setMenuAtivo} />
          <Content>{children}</Content>
        </div>
      </Grid>
  );
};

export default LayoutAdminMain;
