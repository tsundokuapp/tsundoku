import React, { useState } from "react";
import Grid from "./styles";
import MainHeader from "../../../Admin/MainHeader";
import Aside from "../../../Admin/Aside";
import Content from '../../../Admin/Content/styles';
import { Brightness3, Brightness6, Brightness7 } from "@material-ui/icons";

interface ILayoutDashBoard { children?: React.ReactNode; }

const LayoutAdminMain = ({ children }: ILayoutDashBoard) => {  
  const [menuAtivo, setMenuAtivo] = useState(true);

  const opcoes = [
    {
      indiceTema: "dark",
      icone: <Brightness3 />,
    },
    {
      indiceTema: "light",
      icone: <Brightness7 />,
    },
    {
      indiceTema: "sepia",
      icone: <Brightness6 />,
    },
  ];

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
