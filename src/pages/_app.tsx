import type { AppProps } from "next/app";
import React, { useState } from "react";
import Navbar from "../components/NavBar";
import GlobalStyle from "../styles/global";
import { combineTheme, light, dark, sepia } from "../styles/themes";
import { DefaultTheme, ThemeProvider } from "styled-components";

import iconDark from "../assets/img/IconDark.svg";
import iconLight from "../assets/img/IconLight.svg";
import iconSepia from "../assets/img/IconSepia.svg";


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState<DefaultTheme>(combineTheme(dark));
  
  const alteraTema = (tema: string) => {
    if (tema === "dark") setTheme(dark);      

    if (tema === "light") setTheme(light);
    
    if (tema === "sepia") setTheme(sepia);

  };

  const options = [
    {
      value: "dark",
      label: iconDark,
    },
    {
      value: "light",
      label: iconLight,
    },
    {
      value: "sepia",
      label: iconSepia
    },
  ];

  

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar
        tema={theme.title}
        options={options}
        onChange={(e) => alteraTema(e.target.value)}
      />
      <Component {...pageProps} />    
    </ThemeProvider>
  );
};

export default MyApp;
