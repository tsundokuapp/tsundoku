import React, { useState } from "react";
import Grid from "./styles";
import MainHeader from "components/MainHeader";
import Aside from "components/Aside";
import Content from '../Content/styles';
import { DefaultTheme, ThemeProvider } from "styled-components";
import { combineTheme, dark } from "../../styles/themes";
import { Brightness3, Brightness6, Brightness7 } from "@material-ui/icons";
import { PropsWithChildren } from 'react';

interface ILayoutDashBoard { children?: React.ReactNode; }

const LayoutDashBoard: React.FC<PropsWithChildren<ILayoutDashBoard>> = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(combineTheme(dark));
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
    <ThemeProvider theme={theme}>
      <Grid menu={menuAtivo} className="wrapper" >
        <div className="coluna-grid">
          <Aside className={classeHide + " aside"} />
          {/* {menuAtivo && <Aside />} */}
        </div>
        <div className="coluna-grid-main">
          <MainHeader opcoes={opcoes} setTheme={setTheme} setMenu={setMenuAtivo} />
          <Content>{children}</Content>
        </div>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutDashBoard;
