import React, { useState } from "react";
import Grid from "./styles";
import MainHeader from "components/MainHeader";
import Aside from "components/Aside";
import Content from "components/Content";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { combineTheme, dark } from "../../styles/themes";
import { Brightness3, Brightness6, Brightness7 } from "@material-ui/icons";


const LayoutDashBoard: React.FC = ({ children }) => {
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
 

  return (
    <Grid menu={menuAtivo}>
      <ThemeProvider theme={theme}>
        <MainHeader opcoes={opcoes} setTheme={setTheme} setMenu={setMenuAtivo} />
        {menuAtivo && <Aside />}
        <Content>{children}</Content>
      </ThemeProvider>
    </Grid>
  );
};

export default LayoutDashBoard;
