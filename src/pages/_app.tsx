import type { AppProps } from "next/app";
import React, { useState } from "react";
import Navbar from "../components/NavBar";
import GlobalStyle from "../styles/global";
import { combineTheme, dark } from "../styles/themes";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { Brightness2, Brightness4, Brightness7} from "@material-ui/icons";


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState<DefaultTheme>(combineTheme(dark));
 
  const opcoes = [
    {
      indiceTema: "dark",
      icone: <Brightness2 />,
    },
    {
      indiceTema: "light",
      icone: <Brightness7 />,
    },
    {
      indiceTema: "sepia",
      icone: <Brightness4 />
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar tema={theme.title} opcoes={opcoes} setTheme={setTheme} />
      <Component {...pageProps} />    
    </ThemeProvider>
  );
};

export default MyApp;
